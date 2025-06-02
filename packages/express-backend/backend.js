import dotenv from "dotenv";

dotenv.config();

import express from "express";
import cors from "cors";
import {connectToDB} from "./mongoose-connection.js";
import * as cookie from "cookie";
import {login, signup} from "./auth/auth-services.js";
import {authenticatedRoute} from "./auth/auth-middleware.js";


const app = express();
const port = process.env.PORT || 52784;

app.use(cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true
}));
app.use(express.json());

let mongooseServices;

connectToDB().then(services => {
    mongooseServices = services;
    app.listen(port, () => {
        console.log(`Listening on http://localhost:${port}`);
    });
}).catch(err => {
    console.error("Failed to connect to DB:", err);
});

app.post("/auth/signup", async (req, res) => {
    const user = req.body;
    console.log("Signing up:", user);

    try {
        await signup({
            username: user.username,
            email: user.email,
            password: user.password
        });

        res.send("Successfully signed up.");
    } catch (e) {
        console.log(e);
        res.status(500).send("Unable to sign up.");
    }
})
app.post("/auth/login", async (req, res) => {
    const user = req.body;
    console.log(user);

    try {
        const credentials = await login(user.username, user.password);

        console.log("Credentials created:", credentials);

        res.setHeader(
            "Set-Cookie",
            cookie.serialize(
                "auth",
                JSON.stringify(credentials),
                {
                    httpOnly: true,
                    path: "/",
                    sameSite: "lax",  // or "strict"
                    secure: process.env.NODE_ENV === "production", // important for HTTPS
                    maxAge: 60 * 60 * 24 * 7 // 1 week
                }
            ));

        res.send("Successfully logged in.");
    } catch (e) {
        console.log(e);
        res.status(500).send("Unable to login.");
    }

})

app.get("/users/account", authenticatedRoute, async (req, res) => {
    try {
        const user = await mongooseServices.findUserByID(req.user.userId);
        if (!user) {
            return res.status(404).send("user not found");
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send("error finding user");
    }
});

app.get("/users/account/diaries", authenticatedRoute, async (req, res) => {
    try {
        const diaries = await mongooseServices.findDiariesByUser(req.user.userId);
        if (!diaries) {
            return res.status(404).send("user or diaries not found");
        }
        res.status(200).send(diaries ?? []);
    } catch (error) {
        res.status(500).send("error fetching diaries");
    }
});

app.get("/diaries/:diaryId/pages", authenticatedRoute, async (req, res) => {
    try {
        const pages = await mongooseServices.findPagesByDiary(req.params.diaryId);
        // No pages should be successful
        // if (!pages) {
        //     return res.status(404).send("no pages found");
        // }
        res.status(200).send(pages || []);
    } catch (error) {
        res.status(500).send("error fetching pages");
    }
});

app.get("/diaries/:diaryId/pages/:pageId", authenticatedRoute, async (req, res) => {
    try {
        const page = await mongooseServices.findPageByDiaryAndPageID(req.params.diaryId, req.params.pageId);
        if (!page) {
            return res.status(404).send("page not found");
        }
        res.status(200).send(page);
    } catch (error) {
        res.status(500).send("error finding page: " + error);
    }
});
app.post("/users", authenticatedRoute, async (req, res) => {
    try {
        const {username, password, email, profilePicture} = req.body;
        if (!username || !password || !email) {
            return res.status(400).send("Missing required user fields");
        }

        const newUser = await mongooseServices.addUser({username, password, email, profilePicture});
        res.status(201).send({id: newUser._id, username: newUser.username});
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).send(`Error adding user: ${error.message}`);
    }
});

// app.post("/users/:id/securityID"), async( req, res) => {
//     try{
//         const authToken = req.authToken;
//         if (!authToken) {
//             res.status(401).send("auth token not found");
//         }
//         const refreshToken = req.refreshtoken;
//     }
//     catch (error)
// }

app.post("/users/account/diaries", authenticatedRoute, async (req, res) => {
    try {
        const title = req.body;
        if (!title) {
            return res.status(400).send("missing required diary title");
        }

        const newDiary = await mongooseServices.addDiary(title, req.user.userId);
        res.status(201).send(newDiary);
    } catch (error) {
        res.status(500).send("error adding diary");
    }
});

app.post("/diaries/:diaryId/pages", authenticatedRoute, async (req, res) => {
    try {
        const {title, body} = req.body;
        if (!title || !body) {
            return res.status(400).send("missing required page fields");
        }

        const newPage = await mongooseServices.addPage({title, body, date: new Date()}, req.params.diaryId);
        res.status(201).send(newPage);
    } catch (error) {
        res.status(500).send("error adding page");
    }
});

app.get("/diaries/random", authenticatedRoute, async (req, res) => {
    try {
        const page = await mongooseServices.findRandomPage();

        if (page) {
            res.status(201).send(page);
        }
        else {
            const errMsg = "Error finding random page";
            console.error(errMsg);
            res.status(500).send(errMsg);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

app.get("/", (req, res) => {
    res.send("localhost:8002/users");
});

app.delete("/diaries/:diaryId/pages/:pageId", authenticatedRoute, async (req, res) => {
    const {diaryId, pageId} = req.params;

    try {
        const deletedPage = await mongooseServices.removePage(pageId, diaryId);
        if (!deletedPage) {
            return res.status(404).send("page not found");
        }
        res.status(200).send({success: true, page: deletedPage});
    } catch (error) {
        console.error("Error deleting page", error);
        res.status(500).send("Internal server error");
    }
})