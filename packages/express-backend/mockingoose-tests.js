const mockingoose = require('mockingoose')

//figure out how to import correctly
import User from './mongoose-services.js/User';
const Diary = require('./mongoose-services.js/Diary');
const Page = require('./mongoose-services.js/Page');

const {findUserByID} = require("./mongoose-services.js"); //might be messed up


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

    it('should return the doc with update', () => {
        const _doc = {
            _id: ObjectId('661bf7e21d2c3a7a4f3e6b19'),
            username: 'willmayer77',
            password: "password",
            email: 'test@example.com',
            diariesID: [],
            profilePicture: ''
        };

        mockingoose(User).toReturn(_doc, 'update');

        return User
            .update({ username: 'changed' }) // this won't really change anything
            .where({ _id: '661bf7e21d2c3a7a4f3e6b19' })
            .then(doc => {
                expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
            });
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

    it('should return the doc with update', () => {
        const _doc = {
            _id: '507f191e810c19729de860ea',
            title: "My Diary Model",
            lastEntry: "10/20/30",
            numEntries: 0,
            entries: []
        };

        mockingoose(Diary).toReturn(_doc, 'update');

        return Diary
            .update({ title: 'changed' }) // this won't really change anything
            .where({ _id: '507f191e810c19729de860ea' })
            .then(doc => {
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

    it('should return the doc with update', () => {
        const _doc = {
            title: "My Page Model",
            date: "3005",
            body: "This is a page entry. Im going to talk about my day. It was kinda bad. but also kinda good."
        };

        mockingoose(Page).toReturn(_doc, 'update');

        return Page
            .update({ title: 'changed' }) // this won't really change anything
            .where({ _id: '507f191e810c19729de860ea' })
            .then(doc => {
                expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
            });
    });
});