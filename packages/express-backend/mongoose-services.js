// packages/express-backend/mongoose-services.js
import mongoose from "mongoose";

mongoose.set("debug", true);

mongoose
    .connect("mongodb+srv://breakingbadder:<db_password>@breakingbadderdb.8njno.mongodb.net/?retryWrites=true&w=majority&appName=breakingBadderDB", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .catch((error) => console.log(error));

// Schema definitions
// Page
const PageSchema = new mongoose.Schema({
    title: {type: String, required: true},
    date: {type: Date, required: true, default: Date.now}, // might not be Date type
    body: {type: String, required: true},
});

// Diary
const DiarySchema = new mongoose.Schema({
    title: {type: String, required: true},
    lastEntry: {type: Date, required: true, default: Date.now}, // also might not be Date
    numEntries: this.entries.length, // does this work?
    entries: [PageSchema]
});

// User
const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    diariesID: [{type: mongoose.Schema.Types.ObjectId, ref: "Diary"}], //reference to Diary docs this might need to change
    profilePicture: {type: String} //should be a URL
});

// Create Models
const Page = mongoose.model("Page", PageSchema);
const Diary = mongoose.model("Diary", DiarySchema);
const User = mongoose.model("User", UserSchema);

// Data Functions
// Read Functions

// returns user based on ID
function findUserByID(id) {
    return User.findByID(id);
}

// returns diaries associated with user based on userID
function findDiariesByUser(UserID) {
    return User.findById(UserID).populate("diariesID");
}

// returns all pages associated with a Diary
// change this later so that it sends data in chunks
function findPagesByDiary(DiaryID) {
    return Diary.findById(DiaryID)
        .then((result) => {
            return result.entries;
        })
}

// returns a page based on its id
function findPageByDiaryAndPageID(DiaryID, PageID) {
    return Diary.findById(DiaryID)
        .then((result) => {
            return result.entries.find(entry => entry._id.toString() === PageID);
        })
}

// returns a random page from all diaries
function findRandomPage() {
    const diaryInd = Math.floor(Math.random() * Diary.countDocuments());
    const randomDiary = Diary.findOne().skip(diaryInd);
    const pageInd = Math.floor(Math.random() * randomDiary.countDocuments());
    return randomDiary.entries[pageInd];
}

// Create Functions

// adds a User
function addUser(user) {
    let newUser = new User(user);
    const promise = newUser.save();
    return promise;
}

// adds a Diary to the given User
async function addDiary(diary, userID) {
    let newDiary = new Diary(diary);
    const diaryID = newDiary._id;
    await newDiary.save();
    const user = await User.findById(userID);
    user.diariesID.push(diaryID);
    await user.save();
    return newDiary;
}

// adds a Page to the given Diary
async function addPage(page, diaryID) {
    const diary = await Diary.findById(diaryID);
    let newPage = new Page(page);
    diary.entries.push(newPage);
    await diary.save();
    return newPage;
}

// Delete Functions

// deletes the given user
function removeUser(userID) {
    return User.findByIdAndDelete(userID);
}

// delete the given Diary based on given User
async function removeDiary(diaryID, userID) {
    const user = await User.findById(userID);
    user.diariesID.pull(diaryID); // pull is how we remove an ID reference
    await user.save();
    const diary = await Diary.findById(diaryID);
    await Diary.findByIdAndDelete(diaryID);
    return diary;
}

// delete the given page based on the given diary
async function removePage(pageID, diaryID) {
    const diary = await Diary.findById(diaryID);
    const page = diary.entries.id(pageID);
    page.deleteOne()
    await diary.save();
    return page;
}

// put the given user information into the given userID
async function editUser(user, userID) {
    const allowedFields = ["username", "email", "profilePicture"];
    const filteredUser = Object.fromEntries(Object.entries(user).filter(([key]) => allowedFields.includes(key)));
    return await User.findByIdAndUpdate(userID, filteredUser, {new: true});
}

// updates password field only for security
async function editPassword(userID, password) {
    return await User.findByIdAndUpdate(userID, password, {new: true});
}

// updates a page by given diaryID and pageID
async function editPage(diaryID, pageID, pageData) {
    const diary = await Diary.findById(diaryID);
    const page = diary.entries.id(pageID);
    Object.assign(page, pageData);
    await diary.save();
    return page;
}

// exporting functions
export default {
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
};