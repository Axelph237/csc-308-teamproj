import * as mockingoose from "mockingoose";
import mongoose from "mongoose";
import {jest} from "@jest/globals";

const {
    Types: {ObjectId},
} = mongoose;

import createMongooseServices from "./mongoose-services.js";

import {describe, expect, it} from "@jest/globals";

const {
    models,
    findUserByID,
    findDiariesByUser,
    findDiaryByID,
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
    addComment,
    addLike,
    removeLike
} = createMongooseServices(mongoose);

const { User, Diary, Page } = models;

describe('test mongoose User model', () => {

describe("test mongoose User model", () => {
    it("should return the doc with findById", () => {
        const _doc = {
            _id: "661bf7e21d2c3a7a4f3e6b19",
            username: "willmayer77",
            password: "password",
            email: "test@example.com",
            diariesID: [],
            profilePicture: "",
        };

        mockingoose(User).toReturn(_doc, "findOne");

        return findUserByID({_id: "661bf7e21d2c3a7a4f3e6b19"}).then((doc) => {
            expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
        });
    });

    it('should edit allowed fields of a user', async () => {
        const userId = '661bf7e21d2c3a7a4f3e6b19';
        const updatedFields = {
            username: 'newUsername',
            email: 'newemail@example.com',
            profilePicture: 'newpic.jpg',
            password: 'shouldBeIgnored' // should not be updated
        };

        const expectedUser = {
            _id: userId,
            username: 'newUsername',
            email: 'newemail@example.com',
            profilePicture: 'newpic.jpg',
            diariesID: [],
        };

        mockingoose(User).toReturn(expectedUser, 'findOneAndUpdate');

        const result = await editUser(updatedFields, userId);

        expect(JSON.parse(JSON.stringify(result))).toMatchObject(expectedUser);
    });
    it('should edit user password', async () => {
        const userId = '661bf7e21d2c3a7a4f3e6b19';
        const newPassword = 'newSecurePassword123';

        const expectedUser = {
            _id: userId,
            username: 'willmayer77',
            email: 'test@example.com',
            password: newPassword,
            diariesID: [],
            profilePicture: ''
        };


        mockingoose(User).toReturn(expectedUser, 'findOneAndUpdate');

        const result = await editPassword(userId, newPassword);

        expect(JSON.parse(JSON.stringify(result))).toMatchObject(expectedUser);
    });


    it("should edit allowed fields of a user", async () => {
        const userId = "661bf7e21d2c3a7a4f3e6b19";
        const updatedFields = {
            username: "newUsername",
            email: "newemail@example.com",
            profilePicture: "newpic.jpg",
            password: "shouldBeIgnored", // should not be updated
        };

        const expectedUser = {
            _id: userId,
            username: "newUsername",
            email: "newemail@example.com",
            profilePicture: "newpic.jpg",
            diariesID: [],
        };

        mockingoose(User).toReturn(expectedUser, "findOneAndUpdate");

        const result = await editUser(updatedFields, userId);

        expect(JSON.parse(JSON.stringify(result))).toMatchObject(expectedUser);
    });
    it("should edit user password", async () => {
        const userId = "661bf7e21d2c3a7a4f3e6b19";
        const newPassword = "newSecurePassword123";

        const expectedUser = {
            _id: userId,
            username: "willmayer77",
            email: "test@example.com",
            password: newPassword,
            diariesID: [],
            profilePicture: "",
        };

        mockingoose(User).toReturn(expectedUser, "findOneAndUpdate");

        const result = await editPassword(userId, newPassword);

        expect(JSON.parse(JSON.stringify(result))).toMatchObject(expectedUser);
    });
});

describe("test mongoose Diary model", () => {
    it("should return the doc with findById", () => {
        const _doc = {
            _id: "507f191e810c19729de860ea",
            title: "My Diary Model",
            lastEntry: "10/20/30",
            numEntries: 0,
            entries: [],
        };

        mockingoose(Diary).toReturn(_doc, "findOne");

        return findDiaryByID({_id: "507f191e810c19729de860ea"}).then((doc) => {
            expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
        });
    });
    it('should return empty array if diary is not found in findPagesByDiary', async () => {
        mockingoose(Diary).toReturn(null, 'findOne');

        const result = await findPagesByDiary('nonexistent-id');
        expect(result).toEqual([]);
    });

    it('testing addDiary', () => {
        const _input = {
            title: "diaryTypeshii",
            lastEntry: "nunyabiznuss",
            numEntries: 30,
            entries: []
        };
        const _mockedSave = {
            ..._input
        };

        mockingoose(Diary).toReturn(_mockedSave, 'save');

        return addDiary(_input).then(doc => {
            expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_mockedSave);
        });
    });

    it('testing removeDiary (need to add first)', () => {
        const _input = {
            title: "diaryTypeshii",
            lastEntry: "nunyabiznuss",
            numEntries: 30,
            entries: []
        };
        const _mockedSave = {
            ..._input
        };
        const _mockedDelete = {}

        mockingoose(Diary).toReturn(_mockedSave, 'save');
        mockingoose(Diary).toReturn(_mockedDelete, 'findOneAndRemove');

        const diary = addDiary(_input).then(doc => {
            expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_mockedSave);
        });
        return removeDiary( diary._id ).then(doc => {
            expect(doc == null);
        })
    });
});

describe("test mongoose Page model", () => {
    it("should return the correct page for diary and page ID", () => {
        const mockPageId = "662e9eac6f6c4b2f9c4f9f22";
        const _mockedDiary = {
            _id: "662e9eac6f6c4b2f9c4f9f21",
            title: "Test Diary",
            lastEntry: "04/15/25",
            numEntries: 1,
            entries: [
                {
                    _id: mockPageId,
                    title: "Test Page",
                    date: "04/15/25",
                    body: "This is a test page",
                },
            ],
        };

        mockingoose(Diary).toReturn(_mockedDiary, "findOne");

        return findPageByDiaryAndPageID(_mockedDiary._id, mockPageId).then(
            (page) => {
                expect(JSON.parse(JSON.stringify(page))).toMatchObject({
                    _id: mockPageId,
                    title: "Test Page",
                    date: "04/15/25",
                    body: "This is a test page",
                });
            },
        );
    });
    it("testing addPage", () => {
        const _input = {
            title: "I did summn today",
            date: "3000 BCE",
            body: "yabadababdeodeodaodaodaodaodoad",
        };
        const _mockedSave = {
            ..._input,
        };

        mockingoose(Page).toReturn(_mockedSave, "save");

        return addPage(_input).then((doc) => {
            expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_mockedSave);
        });
    });
    it('should return a random page', async () => {
        const diaryId = new ObjectId();
        const page1Id = new ObjectId();
        const page2Id = new ObjectId();

        const mockDiary = {
            _id: diaryId,
            title: "Mock Diary",
            lastEntry: "01/01/2025",
            numEntries: 2,
            entries: [
                {
                    _id: page1Id,
                    title: 'Page 1',
                    body: 'First body',
                    date: '2025-01-01'
                },
                {
                    _id: page2Id,
                    title: 'Page 2',
                    body: 'Second body',
                    date: '2025-01-02'
                }
            ]
        };

        mockingoose(Diary).toReturn(2, 'countDocuments');
        mockingoose(Diary).toReturn(mockDiary, 'findOne');

        const result = await findRandomPage();
        expect(['Page 1', 'Page 2']).toContain(result.title);
    });


    it('testing addPage', () => {
        const _input = {
            title: "I did summn today",
            date: "3000 BCE",
            body: "yabadababdeodeodaodaodaodaodoad",
        };
        const _mockedSave = {
            ..._input
        };

        mockingoose(Page).toReturn(_mockedSave, 'save');

        return addPage(_input).then(doc => {
            expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_mockedSave);
        });
    });

    it('should edit a page within a diary', async () => {
        const diaryId = '662e9eac6f6c4b2f9c4f9f21';
        const pageId = '662e9eac6f6c4b2f9c4f9f22';

        const originalDiary = {
            _id: diaryId,
            title: "Original Diary",
            lastEntry: "04/15/25",
            numEntries: 1,
            entries: [
                {
                    _id: pageId,
                    title: "Old Title",
                    date: "04/15/25",
                    body: "Old Body",
                    save: jest.fn()
                }
            ],
            save: jest.fn().mockResolvedValue(true)
        };

        const updatedData = {
            title: "New Title",
            date: "04/16/25",
            body: "Updated body content"
        };

        const expectedPage = {
            _id: pageId,
            ...updatedData
        };
        mockingoose(models.Diary).toReturn(originalDiary, 'findOne');

        const result = await editPage(diaryId, pageId, updatedData);

        expect(JSON.parse(JSON.stringify(result))).toMatchObject(expectedPage);
    });

    it('should add a comment to a diary page, add a like, then remove it', async () => {
        const did = "749382d561b649e84101e0ce";
        const pid = "749920d561b649e84101e0ce";

        const mockPage3 = {
            _id: did, // use the real ObjectId, not string
            title: 'Test Page',
            body: 'Test Body',
            date: '2025-01-01',
            comments: [],
        };

        const mockDiary3 = {
            _id: pid,
            title: 'Test Diary',
            entries: [mockPage3],
            save: jest.fn().mockResolvedValue(true), // only if you're calling .save() on the diary
        };

        mockingoose(models.Diary).toReturn(mockDiary3, 'findById');

        // Then when calling addComment, make sure you pass pageId.toString():
        const result = await addComment(did, "662e9eac6f6c4b2f9c4f9f22", 'Nice job!');
        const result2 = await addLike(did, "662e9eac6f6c4b2f9c4f9f22");
        const result3 = await removeLike(did, "662e9eac6f6c4b2f9c4f9f22");
        expect(result.comments).toContain('Nice job!');
    });

    it('testing removePage (need to add first)', () => {
        const _input = {
            title: "I did summn today",
            date: "3000 BCE",
            body: "yabadababdeodeodaodaodaodaodoad",
        };
        const _mockedSave = {
            ..._input
        };

        mockingoose(Page).toReturn(_mockedSave, 'save');

        return removePage( '662e9eac6f6c4b2f9c4f9f22' ).then(doc => {
            expect(doc == null);
        })
    });

});
