import * as cookie from "cookie";
import {validateCredentials} from "./auth-services.js";

export async function isAuthenticated (req, res, next) {
    const { auth} = cookie.parse(req.headers.cookie);

    const credentials = JSON.parse(auth);


    console.log("Credentials:", credentials);

    console.log("Access Token:", credentials.accessToken);
    console.log("Refresh Token:", credentials.refreshToken);

    const validUser = await validateCredentials(credentials);
    console.log("Is valid user:", validUser);


    next()
}