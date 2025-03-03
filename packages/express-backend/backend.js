import express from "express";
import cors from "cors";
import mongooseServices from "./mongoose-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/users/:id", async (req, res) => {
    try {
        const user = await mongooseServices.findUserByID(req.params.id);
        if (!user) {
            return res.status(404).send("user not found");
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send("error finding user");
    }
});

app.get("/users/:id/diaries", async (req, res) => {
    try {
        const diaries = await mongooseServices.findDiariesByUser(req.params.id);
        if (!diaries) {
            return res.status(404).send("user or diaries not found");
        }
        res.status(200).send(diaries.diaryIds);
    } catch (error) {
        res.status(500).send("error fetching diaries");
    }
});

app.get("/diaries/:diaryId/pages", async (req, res) => {
    try {
        const pages = await mongooseServices.findPagesByDiary(req.params.diaryId);
        if (!pages) {
            return res.status(404).send("diary not found");
        }
        res.status(200).send(pages);
    } catch (error) {
        res.status(500).send("error fetching pages");
    }
});

app.get("/diaries/:diaryId/pages/:pageId", async (req, res) => {
    try {
        const page = await mongooseServices.findPageByDiaryAndPageID(req.params.diaryId, req.params.pageId);
        if (!page) {
            return res.status(404).send("page not found");
        }
        res.status(200).send(page);
    } catch (error) {
        res.status(500).send("error finding page");
    }
});

app.post("/users", async (req, res) => {
    try {
        const { username, password, email, profilePicture } = req.body;
        if (!username || !password || !email) {
            return res.status(400).send("missing required user fields");
        }

        const newUser = await mongooseServices.addUser({ username, password, email, profilePicture });
        res.status(201).send(newUser);
    } catch (error) {
        res.status(500).send("error adding user");
    }
});

app.post("/users/:id/diaries", async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).send("missing required diary title");
        }

        const newDiary = await mongooseServices.addDiary({ title }, req.params.id);
        res.status(201).send(newDiary);
    } catch (error) {
        res.status(500).send("error adding diary");
    }
});

app.post("/diaries/:diaryId/pages", async (req, res) => {
    try {
        const { title, body } = req.body;
        if (!title || !body) {
            return res.status(400).send("missing required page fields");
        }

        const newPage = await mongooseServices.addPage({ title, body, date: new Date() }, req.params.diaryId);
        res.status(201).send(newPage);
    } catch (error) {
        res.status(500).send("error adding page");
    }
});

app.get("/", (req, res) => {
    res.send("localhost:8000/users");
});

app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});
