import * as mockingoose from 'mockingoose';
import mongoose from "mongoose";
const { Types: { ObjectId } } = mongoose;

import createMongooseServices, { models } from "./mongoose-services.js";
const { User, Diary, Page } = models;

const {
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

        return User.findById({ _id: '661bf7e21d2c3a7a4f3e6b19' }).then(doc => {
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

       /* return addUser(_input).then(result => {
            expect(result).toHaveProperty('username', _input.username);
            expect(result).toHaveProperty('email', _input.email);
            expect(result).toHaveProperty('password', _input.password);
        }); */

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

        return Diary.findById({ _id: '507f191e810c19729de860ea' }).then(doc => {
            expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
        });
    });
});

describe('test mongoose Page model', () => {
    it('should return the doc with findById', () => {
        const _doc = {
            title: "My Page Model",
            date: "3005",
            body: "This is a page entry. Im going to talk about my day. It was kinda bad. but also kinda good."
        };

        mockingoose(Page).toReturn(_doc, 'findOne');

        return Page.findById({ _id: '507f191e810c19729de860ea' }).then(doc => {
            expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
        });
    });
});