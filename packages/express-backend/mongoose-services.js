// packages/express-backend/mongoose-services.js
const mongoose = require("mongoose");

mongoose.set("debug", true);

mongoose.set("debug", true);
mongoose.connect('mongodb://localhost:27017/users', {
//mongoose.connect('mongodb+srv://user:weakpassword@breakbad.4hvan.mongodb.net/?retryWrites=true&w=majority&appName=breakbad', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected successfully!");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

// Schema definitions
// Page
const PageSchema = new mongoose.Schema({
    title: {type: String, required: true},
    date: {type: String, required: true},
    body: {type: String, required: true},
});

// Diary
const DiarySchema = new mongoose.Schema({
    title: {type: String, required: true},
    lastEntry: {type: String, required: true},
    numEntries: {type: Number, required: true, default: 0},
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
    return User.findById(id);
}

// returns diaries associated with user based on userID
async function findDiariesByUser(UserID) {
    const user = await User.findById(UserID);
    await user.populate("diariesID");
    await user.save();
    return user.diariesID;
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
    diary.numEntries++;
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
    diary.numEntries--;
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
module.exports = {
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