import * as mockingoose from 'mockingoose';
import mongoose from "mongoose";
const { Types: { ObjectId } } = mongoose;

import createMongooseServices, { models } from "./mongoose-services.js";
<<<<<<< HEAD
import {describe, expect, it} from "@jest/globals";
=======
import {expect} from "@jest/globals";
>>>>>>> e69eb24708c84ae2e932c7cb59be93f90bdc852d
const { User, Diary, Page } = models;

const {
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
    editPage
} = createMongooseServices(mongoose);

describe('test mongoose User model', () => {
    it('should return the doc with findById', () => {
        const _doc = {
            _id: '661bf7e21d2c3a7a4f3e6b19',
            username: 'willmayer77',
            password: "password",
            email: 'test@example.com',
            diariesID: [],
            profilePicture: ''
        };

        mockingoose(User).toReturn(_doc, 'findOne');

        return findUserByID({ _id: '661bf7e21d2c3a7a4f3e6b19' }).then(doc => {
            expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
        });

    });
    it('testing addUser', () => {
        const _input = {
            username: 'willmayer77',
            email: 'test@example.com',
            password: "password"
        };
        const _mockedSave = {
            _id: '661bf7e21d2c3a7a4f3e6b19',
            ..._input,
            diariesID: [],
            profilePicture: ''
        };

        mockingoose(User).toReturn(_mockedSave, 'save');

        return addUser(_input).then(doc => {
            expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_mockedSave);
        });
    });
<<<<<<< HEAD
=======
    it('testing removeUser (need to add first)', () => {
        const _input = {
            username: 'willmayer77',
            email: 'test@example.com',
            password: "password"
        };
        const _mockedSave = {
            _id: '661bf7e21d2c3a7a4f3e6b19',
            ..._input,
            diariesID: [],
            profilePicture: ''
        };
        const _mockedDelete = {}

        mockingoose(User).toReturn(_mockedSave, 'save');
        mockingoose(User).toReturn(_mockedDelete, 'findOneAndRemove');

        return addUser(_input).then(doc => {
            expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_mockedSave);
        });
        return removeUser( '661bf7e21d2c3a7a4f3e6b19' ).then(doc => {
            expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_mockedDelete);
        })
    });
>>>>>>> e69eb24708c84ae2e932c7cb59be93f90bdc852d
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
});

describe('test mongoose Diary model', () => {
    it('should return the doc with findById', () => {
        const _doc = {
            _id: '507f191e810c19729de860ea',
            title: "My Diary Model",
            lastEntry: "10/20/30",
            numEntries: 0,
            entries: []
        };

        mockingoose(Diary).toReturn(_doc, 'findOne');

        return findDiaryByID({ _id: '507f191e810c19729de860ea' }).then(doc => {
            expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
        });
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

        return addDiary(_input).then(doc => {
            expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_mockedSave);
        });
        return removeDiary( '661bf7e21d2c3a7a4f3e6b19' ).then(doc => {
            expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_mockedDelete);
        })
    });
});

describe('test mongoose Page model', () => {
    it('should return the correct page for diary and page ID', () => {
        const mockPageId = '662e9eac6f6c4b2f9c4f9f22';
        const _mockedDiary = {
            _id: '662e9eac6f6c4b2f9c4f9f21',
            title: "Test Diary",
            lastEntry: "04/15/25",
            numEntries: 1,
            entries: [
                {
                    _id: mockPageId,
                    title: "Test Page",
                    date: "04/15/25",
                    body: "This is a test page"
                }
            ]
        };

        mockingoose(Diary).toReturn(_mockedDiary, 'findOne');

        return findPageByDiaryAndPageID(_mockedDiary._id, mockPageId).then(page => {
            expect(JSON.parse(JSON.stringify(page))).toMatchObject({
                _id: mockPageId,
                title: "Test Page",
                date: "04/15/25",
                body: "This is a test page"
            });
        });
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
<<<<<<< HEAD
=======
    it('testing removePage (need to add first)', () => {
        const _input = {
            title: "I did summn today",
            date: "3000 BCE",
            body: "yabadababdeodeodaodaodaodaodoad",
        };
        const _mockedSave = {
            ..._input
        };
        const _mockedDelete = {}

        mockingoose(Page).toReturn(_mockedSave, 'save');
        mockingoose(Page).toReturn(_mockedDelete, 'findOneAndRemove');

        return addPage(_input).then(doc => {
            expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_mockedSave);
        });
        return removePage( '661bf7e21d2c3a7a4f3e6b19' ).then(doc => {
            expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_mockedDelete);
        })
    });
>>>>>>> e69eb24708c84ae2e932c7cb59be93f90bdc852d
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
});