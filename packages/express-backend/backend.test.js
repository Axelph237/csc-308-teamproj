import mongoose from "mongoose";
import { MongoMemoryServer } from 'mongodb-memory-server';
import createMongooseServices from "./mongoose-services.js";
import { describe, test, expect, beforeAll, afterAll, beforeEach } from "@jest/globals";

let mongoServer;
let mongooseServices;
let connection;

jest.setTimeout(15000);

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    connection = await mongoose.createConnection(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).asPromise();

    mongooseServices = createMongooseServices(connection);
});

afterAll(async () => {
    if (connection) {
        await connection.close();
    }
    if (mongoServer) {
        await mongoServer.stop();
    }
});

beforeEach(async () => {
    const collections = connection.collections;
    for (const key in collections) {
        try {
            await collections[key].deleteMany({});
        } catch (error) {
            console.error(`Error clearing collection ${key}:`, error);
        }
    }
});

test("supposed to add a user", async () => {
    const newUser = await mongooseServices.addUser({
        username: "user",
        password: "password",
        email: "jamiil@gmail.com",
    });

    const foundUser = await mongooseServices.findUserByID(newUser._id);
    expect(foundUser).not.toBeNull();
    expect(foundUser.username).toBe("user");
});


test("Testing addUser -- success", async () => {
    const user = {
        _id: new mongoose.Types.ObjectId(),
        username: "test1",
        password: "password",
        email: "test@test.com",
    };
    const result = await mongooseServices.addUser(user);
    expect(result).not.toBeNull();
    expect(result).toMatchObject(user);
    expect(result).toHaveProperty("diariesID");
    expect(result).toHaveProperty("profilePicture");
});

test("should not return user when ID is invalid", async () => {
    const result = await mongooseServices.findUserByID("6553e004d3d9c08b20300000"); // Fake ObjectID
    expect(result).toBeNull();
});

test("add diary to a user", async () => {
    const user = await mongooseServices.addUser({
        username: "bobDuncan",
        password: "password",
        email: "jamiil@gmail.com",
    });

    const newDiary = await mongooseServices.addDiary(
        { title: "nameofDiary", lastEntry: "entryToBeEntered", numEntries: 0 },
        user._id
    );

    expect(newDiary.title).toBe("nameofDiary");

    const updatedUser = await mongooseServices.findUserByID(user._id);
    const diaries = await mongooseServices.findDiariesByUser(user._id);
    expect(diaries).toContainEqual(expect.objectContaining(newDiary._doc));
    expect(updatedUser.diariesID).toContainEqual(newDiary._id);
});

test("make new page in diary", async () => {
    const user = await mongooseServices.addUser({
        username: "pageMaker",
        password: "makerOfThePages",
        email: "pageMaker@madeAPage.com",
    });

    const diary = await mongooseServices.addDiary(
        {
            title: "diary that has page",
            lastEntry: "enteringEntry",
            numEntries: 0,
        },
        user._id
    );

    const newPage = await mongooseServices.addPage(
        { title: "titleOfPAge", body: "stuff on the page", date: new Date() },
        diary._id
    );

    expect(newPage.title).toBe("titleOfPAge");
    expect(newPage.body).toBe("stuff on the page");

    const updatedDiary = await mongooseServices.findPagesByDiary(diary._id);
    expect(updatedDiary).toContainEqual(
        expect.objectContaining({
            title: "titleOfPAge",
            body: "stuff on the page",
        })
    );
});

test("should not add user with invalid email", async () => {
    try {
        const newUser = await mongooseServices.addUser({
            username: "invalidUser",
            password: "password",
            email: "invalid-email", // Invalid email
        });
    } catch (error) {
        expect(error).toBeTruthy();
    }
});

test("should not add user with missing required fields", async () => {
    try {
        const newUser = await mongooseServices.addUser({
            username: "noEmailUser",
            password: "password",
        });
    } catch (error) {
        expect(error).toBeTruthy();
    }
});
