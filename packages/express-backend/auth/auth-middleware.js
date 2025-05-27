import * as cookie from "cookie";
import {refreshCredentials, validateCredentials} from "./auth-services.js";

export async function authenticatedRoute (req, res, next) {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    if (!cookies.auth) {
        res.status(401).send("Authentication Failed: No request auth cookie");
        return;
    }
    const credentials = JSON.parse(cookies.auth);

    // Validate user
    const userValidation = await validateCredentials(credentials);

    // Validation correctly resolved
    if (!userValidation.errorMessage) {
        // Transform req to contain new user data
        req.user = userValidation;
        next();
        return;
    }

    console.log("Attempted authentication validation failed with message:", userValidation.errorMessage);
    if (userValidation.errorMessage === "ACCESS_TOKEN_EXPIRED") {
        try {
            const newCredentials = await refreshCredentials(credentials)
            if (!newCredentials) {
                res.status(401).send("Authentication Failed: Credentials expired");
                return;
            }

            // Set new credentials in cookie
            res.setHeader(
                "Set-Cookie",
                cookie.serialize(
                    "auth",
                    JSON.stringify(newCredentials)
                ));

            // Transform req to contain new user data
            req.user = await validateCredentials(newCredentials);
            next();
        }
        catch (e) {
            res.status(500).send(`Authentication Unexpectedly Failed With Error: ${e}`);
        }
    }
    else {
        // Unrecoverable cases send same response
        res.status(401).send(`Authentication Failed: ${userValidation.errorMessage}`);
    }
}