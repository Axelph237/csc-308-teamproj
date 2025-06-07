import mongoose from "mongoose";
import bcrypt from "bcrypt";

mongoose.set("debug", true);

const CommentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // user Id
});

const PageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  body: { type: String, required: true },
  likeCounter: { type: Number, default: 0 },
  comments: [CommentSchema],
});

const DiarySchema = new mongoose.Schema({
  title: { type: String, required: true },
  lastEntry: { type: String },
  numEntries: { type: Number, required: true, default: 0 },
  entries: [PageSchema],
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  diariesID: [{ type: mongoose.Schema.Types.ObjectId, ref: "Diary" }],
  profilePicture: { type: String },
  securityID: { type: mongoose.Schema.Types.ObjectId, ref: "Security" },
});

const SecuritySchema = new mongoose.Schema({
  authToken: { type: String, required: true },
  refreshToken: { type: String, required: true },
});

export default function createMongooseServices(connection) {
    const Page = connection.model("Page", PageSchema);
    const Diary = connection.model("Diary", DiarySchema);
    const User = connection.model("User", UserSchema);
    const Security = connection.model("Security", SecuritySchema);

    return {

        models: {Page, Diary, User, Security},

        findUserByUser: (username) => User.findOne({ username }),

        findUserByID: (id) => User.findById(id),

        findDiaryByID: (id) => Diary.findById(id),

        findDiariesByUser: async (userId) => {
            const user = await User.findById(userId);
            await user.populate("diariesID");
            await user.save();
            return user.diariesID;
        },

        findPagesByDiary: async (diaryId) => {
            const diary = await Diary.findById(diaryId);
            return diary ? diary.entries : [];
        },

        findPageByDiaryAndPageID: async (diaryId, pageId) => {
            const diary = await Diary.findById(diaryId);
            if (!diary)
                return null;

            const page = diary.entries.find(entry => entry._id.toString() === pageId);
            if (!page)
                return null;

            return page;
        },

        findRandomPage: async () => {
            const count = await Diary.countDocuments();
            const diaryInd = Math.floor(Math.random() * count);
            const randomDiary = await Diary.findOne().skip(diaryInd);
            if (!randomDiary || !randomDiary.entries.length) return null;
            const pageInd = Math.floor(Math.random() * randomDiary.entries.length);
            return randomDiary.entries[pageInd];
        },


        findPassword: async (userID) => {
            const user = await User.findById(userID);
            return user.password;
        },

        // Create Functions
        addUser: async (user) => {
            const newUser = new User(user);
            await newUser.save();
            return newUser;
        },

        addDiary: async (diary, userId) => {
            const newDiary = new Diary(diary);
            const diaryId = newDiary._id;
            await newDiary.save();
            const user = await User.findById(userId);
            user.diariesID.push(diaryId);
            await user.save();
            return newDiary;
        },

        addPage: async (page, diaryId) => {
            const diary = await Diary.findById(diaryId);
            const newPage = new Page(page);
            diary.entries.push(newPage);
            diary.numEntries++;
            await diary.save();
            return newPage;
        },

        // Delete Functions
        removeUser: (userId) => User.findByIdAndDelete(userId),

        removeDiary: async (diaryId, userId) => {
            const user = await User.findById(userId);
            user.diariesID.pull(diaryId);
            await user.save();
            const diary = await Diary.findById(diaryId);
            await Diary.findByIdAndDelete(diaryId);
            return diary;
        },

        removePage: async (pageId, diaryId) => {
            const diary = await Diary.findById(diaryId);
            const page = diary.entries.id(pageId);
            page.deleteOne();
            diary.numEntries--;
            await diary.save();
            return page;
        },

        // Update Functions
        editUser: async (user, userId) => {
            const allowedFields = ["username", "email", "profilePicture"];
            const filteredUser = Object.fromEntries(
                Object.entries(user).filter(([key]) => allowedFields.includes(key))
            );
            return await User.findByIdAndUpdate(userId, filteredUser, {new: true});
        },

        editPassword: (userId, password) => {
            return User.findByIdAndUpdate(userId, {password}, {new: true});
        },

        editPage: async (diaryId, pageId, pageData) => {
            const diary = await Diary.findById(diaryId);
            const page = diary.entries.id(pageId);
            Object.assign(page, pageData);
            await diary.save();
            return page;
        },
        // add one like to a pages like counter, needs diaryId and PageId
        addLike: async (diaryId, pageId) => {
            const page = Diary.findById(diaryId)
                .then((result) =>
                    result.entries.find(entry => entry._id.toString() === pageId)
                );
            page.likeCounter++;
            return page;
        },

        // remove one like from a pages like counter, needs diaryId and PageId
        removeLike: async (diaryId, pageId) => {
            const page = Diary.findById(diaryId)
                .then((result) =>
                    result.entries.find(entry => entry._id.toString() === pageId)
                );
            page.likeCounter--;
            return page;
        },

        //
        addComment: async (diaryId, pageId, comment) => {
            const diary = await Diary.findById(diaryId);
            console.log("entries:", diary.entries);
            console.log("pageId:", pageId);
            const page = diary.entries.find(entry => entry._id.toString() === pageId);
            if (!page) throw new Error("Page not found");
            page.comments.push(comment);
            await diary.save(); // Save parent
            return page;
        },
        // upsert functions for security
        upsertAuthToken: async (userId, authToken) => {
            const user = await User.findById(userId);
            const security = await Security.findById(user.securityID);
            security.authToken = authToken;
            await security.save();
            return security;
        },

        upsertRefreshToken: async (userId, refreshToken) => {
            const user = await User.findById(userId);
            const security = await Security.findById(user.securityID);
            security.refreshToken = refreshToken;
            await security.save();
            return security;
        }
    };
}
