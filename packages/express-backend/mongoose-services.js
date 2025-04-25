import mongoose from "mongoose";

mongoose.set("debug", true);

const PageSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: String, required: true },
    body: { type: String, required: true },
});

const DiarySchema = new mongoose.Schema({
    title: { type: String, required: true },
    lastEntry: { type: String, required: true },
    numEntries: { type: Number, required: true, default: 0 },
    entries: [PageSchema]
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
    refreshToken: { type: String, required: true }
});

export default function createMongooseServices(connection) {
    const Page = connection.model("Page", PageSchema);
    const Diary = connection.model("Diary", DiarySchema);
    const User = connection.model("User", UserSchema);
    const Security = connection.model("Security", SecuritySchema);

    return {

        findUserByUser: (username) => User.findUserByUser(username),

        findUserByID: (id) => User.findById(id),

        findDiaryByID: (id) => Diary.findById(id),

        findDiariesByUser: async (userId) => {
            const user = await User.findById(userId);
            await user.populate("diariesID");
            await user.save();
            return user.diariesID;
        },

        findPagesByDiary: (diaryId) => {
            return Diary.findById(diaryId)
                .then((result) => result.entries);
        },

        findPageByDiaryAndPageID: (diaryId, pageId) => {
            return Diary.findById(diaryId)
                .then((result) =>
                    result.entries.find(entry => entry._id.toString() === pageId)
                );
        },

        findRandomPage: () => {
            const diaryInd = Math.floor(Math.random() * Diary.countDocuments());
            const randomDiary = Diary.findOne().skip(diaryInd);
            const pageInd = Math.floor(Math.random() * randomDiary.countDocuments());
            return randomDiary.entries[pageInd];
        },

        findPassword: async (userID) => {
            const user = await User.findById(userID);
            return user.password;
        },

        // Create Functions
        addUser: (user) => {
            const newUser = new User(user);
            return newUser.save();
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
            return await User.findByIdAndUpdate(userId, filteredUser, { new: true });
        },

        editPassword: (userId, password) => {
            return User.findByIdAndUpdate(userId, { password }, { new: true });
        },

        editPage: async (diaryId, pageId, pageData) => {
            const diary = await Diary.findById(diaryId);
            const page = diary.entries.id(pageId);
            Object.assign(page, pageData);
            await diary.save();
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

const defaultServices = createMongooseServices(mongoose);
export const models = {
    User: mongoose.model("User"),
    Diary: mongoose.model("Diary"),
    Page: mongoose.model("Page")
};
export const {
    findUserByID,
    findDiariesByUser,
    findPagesByDiary,
    findPageByDiaryAndPageID,
    findRandomPage,
    addUser,
    addDiary,
    addPage,
    removeUser,
    removeDiary,
    removePage,
    editUser,
    editPassword,
    editPage,
    upsertAuthToken,
    upsertRefreshToken,
    findPassword
} = defaultServices;