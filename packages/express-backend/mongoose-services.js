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
  const Comment = connection.model("Comment", CommentSchema);

  return {
    models: {
      Page,
      Diary,
      User,
      Security,
      Comment,
    },

    findUserByUsername: async (username) => {
      return User.findOne({ username });
    },

    findUserByID: (id) => User.findById(id),

    findDiaryByID: (id) => Diary.findById(id),

    findDiariesByUser: async (userId) => {
      const user = await User.findById(userId);
      await user.populate("diariesID");
      await user.save();
      return user.diariesID;
    },

    findPagesByDiary: (diaryId) => {
      return Diary.findById(diaryId).then((result) => result.entries);
    },

    findPageByDiaryAndPageID: (diaryId, pageId) => {
      return Diary.findById(diaryId).then((result) =>
        result.entries.find((entry) => entry._id.toString() === pageId),
      );
    },

    findRandomPage: async () => {
      // Aggregate pipeline:
      // - Match all diaries w/ more than 1 entry
      // - Select one of these at random
      // Then get first (and only) element in aggregate array
      const randomDiary = (
        await Diary.aggregate([
          {
            $match: { numEntries: { $gt: 0 } },
          },
          {
            $sample: { size: 1 },
          },
        ])
      )[0];

      const pageIndex = Math.round(
        Math.random() * (randomDiary.numEntries - 1),
      );

      return {
        parentDiaryId: randomDiary._id.toString(),
        page: randomDiary.entries[pageIndex],
      };
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

    addSecurity: async (security) => {
      const newSecurity = new Security(security);
      await newSecurity.save();
      return newSecurity;
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

    removeSecurity: async (securityId) => {
      Security.findByIdAndDelete(securityId);
    },

    // Update Functions
    editUser: async (user, userId) => {
      const allowedFields = ["username", "email", "profilePicture"];
      const filteredUser = Object.fromEntries(
        Object.entries(user).filter(([key]) => allowedFields.includes(key)),
      );
      return await User.findByIdAndUpdate(userId, filteredUser, { new: true });
    },

    editPassword: async (userId, password) => {
      const hash = await bcrypt.hash(password, 10);
      return User.findByIdAndUpdate(userId, { password: hash }, { new: true });
    },

    editPage: async (diaryId, pageId, pageData) => {
      const diary = await Diary.findById(diaryId);
      const page = diary.entries.id(pageId);
      Object.assign(page, pageData);
      await diary.save();
      return page;
    },

    editDiary: async (diaryId, diary) => {
      const oldDiary = await Diary.findById(diaryId);
      Diary.assign(oldDiary, diary);
      return await oldDiary.save();
    },

    editDiaryTitle: async (diaryId, title) => {
      const diary = await Diary.findById(diaryId);
      diary.title = title;
      return await diary.save();
    },

    // add one like to a pages like counter, needs diaryId and PageId
    addLike: async (diaryId, pageId) => {
      const diary = await Diary.findById(diaryId);
      const page = diary.entries.find(
        (entry) => entry._id.toString() === pageId,
      );
      page.likeCounter++; // I love that you can add infinite likes as a single user - Aiden
      await page.save();
      await diary.save();
      return page;
    },

    // remove one like from a pages like counter, needs diaryId and PageId
    removeLike: async (diaryId, pageId) => {
      const diary = await Diary.findById(diaryId);
      const page = diary.entries.find(
        (entry) => entry._id.toString() === pageId,
      );
      page.likeCounter--;
      await page.save();
      await diary.save();
      return page;
    },

    // add a comment to a page, needs diaryId and pageId
    addComment: async (diaryId, pageId, comment) => {
      const newComment = await Comment.create(comment);
      const diary = await Diary.findById(diaryId);

      if (!diary) throw new Error("Failed to find diary.");

      const page = diary.entries.find(
        (entry) => entry._id.toString() === pageId,
      );

      if (!page) throw new Error("Failed to find page in diary.");

      if (page?.comments) page.comments.push(newComment);
      else page.comments = [newComment];

      await page.save();
      await diary.save();
      return page;
    },

    // remove a comment from a page, needs diaryId and pageId
    removeComment: async (commentId) => {
      Comment.findByIdAndDelete(commentId);
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
    },
  };
}
