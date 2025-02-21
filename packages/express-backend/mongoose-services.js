import mongoose from "mongoose";

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
    numEntries: entries.length, // does this work?
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

//