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

app.use(
    cors({
        origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
        credentials: true,
    }),
);
app.use(express.json());

let mongooseServices;

connectToDB()
    .then((services) => {
        mongooseServices = services;
        app.listen(port, () => {
            console.log(`Listening on http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to DB:", err);
    });

app.post("/auth/signup", async (req, res) => {
    const user = req.body;
    console.log("Signing up:", user);

    try {
        await signup({
            username: user.username,
            email: user.email,
            password: user.password,
        });

        res.send("Successfully signed up.");
    } catch (e) {
        console.log(e);
        res.status(500).send("Unable to sign up.");
    }
});
app.post("/auth/login", async (req, res) => {
    const user = req.body;
    console.log(user);

    try {
        const credentials = await login(user.username, user.password);

        console.log("Credentials created:", credentials);

        res.setHeader(
            "Set-Cookie",
            cookie.serialize("auth", JSON.stringify(credentials), {
                httpOnly: true,
                path: "/",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24 * 7, // 1 week
            }),
        );

        res.send("Successfully logged in.");
    } catch (e) {
        console.log(e);
        res.status(500).send("Unable to login.");
    }
});

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

app.get(
    "/diaries/:diaryId/pages/:pageId",
    authenticatedRoute,
    async (req, res) => {
        try {
            const page = await mongooseServices.findPageByDiaryAndPageID(
                req.params.diaryId,
                req.params.pageId,
            );
            if (!page) {
                return res.status(404).send("page not found");
            }
            res.status(200).send(page);
        } catch (error) {
            res.status(500).send("error finding page: " + error);
        }
    },
);
app.post("/users", authenticatedRoute, async (req, res) => {
    try {
        const {username, password, email, profilePicture} = req.body;
        if (!username || !password || !email) {
            return res.status(400).send("Missing required user fields");
        }

        const newUser = await mongooseServices.addUser({
            username,
            password,
            email,
            profilePicture,
        });
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

        const newPage = await mongooseServices.addPage(
            {title, body, date: new Date()},
            req.params.diaryId,
        );
        res.status(201).send(newPage);
    } catch (error) {
        res.status(500).send("error adding page");
    }
});

app.get("/diaries/random", authenticatedRoute, async (req, res) => {
    try {
        const result = await mongooseServices.findRandomPage();
        console.log(result);
        if (result.page) {
            res.status(201).send(result);
        } else {
            const errMsg = "Error finding random page";
            console.error(errMsg);
            res.status(500).send(errMsg);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

app.post("/diaries/:diaryId/pages/:pageId/like", authenticatedRoute, async (req, res) => {
    try {
        const {diaryId, pageId} = req.params;

        const likedPage = await mongooseServices.addLike(diaryId, pageId);

        if (!likedPage) {
            return res.status(404).send("Page not found");
        }

        res.status(200).send({message: "Like added", likeCounter: likedPage.likeCounter});
    } catch (error) {
        console.error("Error adding like:", error);
        res.status(500).send("Error adding like");
    }
});

app.post("/diaries/:diaryId/pages/:pageId/comment", authenticatedRoute, async (req, res) => {
    try {
        const {diaryId, pageId} = req.params;
        const {comment} = req.body;

        if (!comment || typeof comment !== "string") {
            return res.status(400).send("Invalid or missing comment");
        }

        const updatedPage = await mongooseServices.addComment(diaryId, pageId, comment);

        if (!updatedPage) {
            return res.status(404).send("Page not found");
        }

        res.status(200).send({message: "Comment added", comments: updatedPage.comments});
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).send("Error adding comment");
    }
});


app.get("/", (req, res) => {
    res.send("localhost:8002/users");
});

app.delete(
    "/diaries/:diaryId/pages/:pageId",
    authenticatedRoute,
    async (req, res) => {
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
    },
);

app.post(
    "/diaries/:diaryId/pages/:pageId/comments",
    authenticatedRoute,
    async (req, res) => {
        const {diaryId, pageId} = req.params;

        const comment = {
            author: req.user.userId,
            text: req.body.comment,
        };

        console.log("Adding comment", comment);
        console.log("To page", pageId);

        try {
            const page = await mongooseServices.addComment(diaryId, pageId, comment);

            if (page) res.status(200).send(page);
            else
                res
                    .status(404)
                    .send("Failed to find given diary and page combination.");
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
);

app.post(
    "/diaries/:diaryId/pages/:pageId/likes",
    authenticatedRoute,
    async (req, res) => {
        const {diaryId, pageId} = req.params;

        try {
            const page = await mongooseServices.addLike(diaryId, pageId);

            if (page) res.status(200).send(page);
            else res.status(404).send("Failed to find page");
        } catch (error) {
            res.status(500).send(error);
        }
    },
);

app.put("/users/:id", authenticatedRoute, async (req, res) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;

        // Make sure only allowed fields are passed (handled in the service)
        const updatedUser = await mongooseServices.editUser(updateData, userId);

        if (!updatedUser) {
            return res.status(404).send("User not found");
        }

        res.status(200).send(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send("Failed to update user");
    }
});

app.put("/users/:id/password", authenticatedRoute, async (req, res) => {
    try {
        const userId = req.params.id;
        const {password} = req.body;

        if (!password || typeof password !== "string") {
            return res.status(400).send({message: "Password is required"});
        }

        const updatedUser = await mongooseServices.editPassword(userId, password);
        console.log(updatedUser);
        if (!updatedUser) {
            return res.status(404).send({message: "User not found"});
        }

        res.status(200).send(updatedUser);
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).send({message: "Failed to update password"});
    }
});

app.put(
    "/diaries/:diaryId/pages/:pageId",
    authenticatedRoute,
    async (req, res) => {
        try {
            const {diaryId, pageId} = req.params;
            const pageData = req.body;

            // Validate input
            if (!pageData || typeof pageData !== "object") {
                return res.status(400).send({message: "Invalid page data"});
            }

            const updatedPage = await mongooseServices.editPage(
                diaryId,
                pageId,
                pageData,
            );

            if (!updatedPage) {
                return res.status(404).send({message: "Page not found"});
            }

            res.status(200).send(updatedPage);
        } catch (err) {
            console.error("Error updating page:", err);
            res.status(500).send({message: "Failed to update page"});
        }
    },
);
