// mongoose-services.js
// main file for direct mongoose access

// imports
import mongoose from "mongoose";
mongoose.set("debug", true);

// Declare mongoose schemas
// Schema for diary page object
const PageSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: String, required: true },
    body: { type: String, required: true },
});

// Schema for diary object
const DiarySchema = new mongoose.Schema({
    title: { type: String, required: true },
    lastEntry: { type: String, required: true },
    numEntries: { type: Number, required: true, default: 0 },
    entries: [PageSchema]
});

// Schema for user object
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    diariesID: [{ type: mongoose.Schema.Types.ObjectId, ref: "Diary" }],
    profilePicture: { type: String },
    securityID: { type: mongoose.Schema.Types.ObjectId, ref: "Security" },
});

// Schema for security object (used for Auth)
const SecuritySchema = new mongoose.Schema({
    authToken: { type: String, required: true },
    refreshToken: { type: String, required: true }
});

// Here's where each schema actually gets declared in mongoose
export default function createMongooseServices(connection) {
    const Page = connection.model("Page", PageSchema);
    const Diary = connection.model("Diary", DiarySchema);
    const User = connection.model("User", UserSchema);
    const Security = connection.model("Security", SecuritySchema);

    // return with all direct access functions
    // functions are named by what they retrieve and what is necessary to retrieve
    return {
        // All Read Functions
        // get User object by the users name
        findUserByUser: (username) => User.findUserByUser(username),

        // get User object by the User ID
        findUserByID: (id) => User.findById(id),

        // get Diary object by the Diary ID
        findDiaryByID: (id) => Diary.findById(id),

        // get all Diaries associated with a User, needs the User ID
        findDiariesByUser: async (userId) => {
            const user = await User.findById(userId);
            await user.populate("diariesID");
            await user.save();
            return user.diariesID;
        },

        // get all Pages associated with a Diary, needs the Diary ID
        findPagesByDiary: (diaryId) => {
            return Diary.findById(diaryId)
                .then((result) => result.entries);
        },

        // get a specific Page, needs the Diary ID and Page ID
        findPageByDiaryAndPageID: (diaryId, pageId) => {
            return Diary.findById(diaryId)
                .then((result) =>
                    result.entries.find(entry => entry._id.toString() === pageId)
                );
        },

        // get a random Page from all possible pages
        // randomizes Diary ID then Page ID
        findRandomPage: () => {
            const diaryInd = Math.floor(Math.random() * Diary.countDocuments());
            const randomDiary = Diary.findOne().skip(diaryInd);
            const pageInd = Math.floor(Math.random() * randomDiary.countDocuments());
            return randomDiary.entries[pageInd];
        },

        // get the password of a User, needs User ID
        findPassword: async (userID) => {
            const user = await User.findById(userID);
            return user.password;
        },

        // All Create Functions
        // make a User from a User JSON
        addUser: (user) => {
            const newUser = new User(user);
            return newUser.save();
        },

        // make a Diary from a Diary JSON and the ID of the associated User
        addDiary: async (diary, userId) => {
            const newDiary = new Diary(diary);
            const diaryId = newDiary._id;
            await newDiary.save();
            const user = await User.findById(userId);
            user.diariesID.push(diaryId);
            await user.save();
            return newDiary;
        },

        // make a Page from a Page JSON and the ID of the associated Diary
        addPage: async (page, diaryId) => {
            const diary = await Diary.findById(diaryId);
            const newPage = new Page(page);
            diary.entries.push(newPage);
            diary.numEntries++;
            await diary.save();
            return newPage;
        },

        // All Delete Functions
        // deletes a User, needs User ID
        removeUser: (userId) => User.findByIdAndDelete(userId),

        // deletes a Diary, needs Diary ID and associated User ID
        removeDiary: async (diaryId, userId) => {
            const user = await User.findById(userId);
            user.diariesID.pull(diaryId);
            await user.save();
            const diary = await Diary.findById(diaryId);
            await Diary.findByIdAndDelete(diaryId);
            return diary;
        },

        // deletes a Page, needs Page ID and associated Diary ID
        removePage: async (pageId, diaryId) => {
            const diary = await Diary.findById(diaryId);
            const page = diary.entries.id(pageId);
            page.deleteOne();
            diary.numEntries--;
            await diary.save();
            return page;
        },

        // All Update Functions
        // updates a User, needs User ID
        // only updates username, email, and pfp, use a separate function for the password
        editUser: async (user, userId) => {
            const allowedFields = ["username", "email", "profilePicture"];
            const filteredUser = Object.fromEntries(
                Object.entries(user).filter(([key]) => allowedFields.includes(key))
            );
            return await User.findByIdAndUpdate(userId, filteredUser, {new: true});
        },

        // updates the password for a User, needs User ID
        editPassword: (userId, password) => {
            return User.findByIdAndUpdate(userId, {password}, {new: true});
        },

        // updates page contents, needs Diary ID and Page ID
        editPage: async (diaryId, pageId, pageData) => {
            const diary = await Diary.findById(diaryId);
            const page = diary.entries.id(pageId);
            Object.assign(page, pageData);
            await diary.save();
            return page;
        },

        // upsert functions for security
        // upserts AuthToken, creating if it doesn't exist
        upsertAuthToken: async (userId, authToken) => {
            const user = await User.findById(userId);
            const security = await Security.findById(user.securityID);
            security.authToken = authToken;
            await security.save();
            return security;
        },

        // upserts RefreshToken, creating if it doesn't exist
        upsertRefreshToken: async (userId, refreshToken) => {
            const user = await User.findById(userId);
            const security = await Security.findById(user.securityID);
            security.refreshToken = refreshToken;
            await security.save();
            return security;
        }
    };
}


// creates the mongoose connect (redundent?)
const defaultServices = createMongooseServices(mongoose);

// exports the mongoose models for use elsewhere
export const models = {
    User: mongoose.model("User"),
    Diary: mongoose.model("Diary"),
    Page: mongoose.model("Page")
};

// exports direct access functions for use elsewhere
export const {
    findUserByID,
    findUserByUser,
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
