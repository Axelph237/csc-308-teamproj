const mongoose = require("mongoose");
const mongooseServices = require("./mongoose-services.js");


beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect("mongodb://localhost:27017/testDB", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
});

afterAll(async () => {
    await mongoose.connection.close();
});

beforeEach(async () => {
    if (mongoose.connection.readyState === 1) {
        await mongoose.connection.db.dropDatabase();
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
    expect(foundUser.email).toBe("jamiil@gmail.com");
});

test("should not return user", async () => {
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
        { title: "nameofDiary", lastEntry: "entryToBeEntered" },
        user._id
    );

    expect(newDiary.title).toBe("nameofDiary");

    const updatedUser = await mongooseServices.findUserByID(user._id);
    expect(updatedUser.diariesID).toContainEqual(newDiary._id);
});


test("make new page in diary", async () => {
    const user = await mongooseServices.addUser({
        username: "pageMaker",
        password: "makerOfThePages",
        email: "pageMaker@madeAPage.com",
    });

    const diary = await mongooseServices.addDiary({
        title: "diary that has page",
        lastEntry: "enteringEntry"
    }, user._id);

    const newPage = await mongooseServices.addPage(
        { title: "titleOfPAge", body: "stuff on the page", date: new Date() },
        diary._id
    );

    expect(newPage.title).toBe("titleOfPAge");
    expect(newPage.body).toBe("stuff on the page");

    const updatedDiary = await mongooseServices.findPagesByDiary(diary._id);
    expect(updatedDiary).toContainEqual(
        expect.objectContaining({ title: "titleOfPAge", body: "stuff on the page" })
    );
});


