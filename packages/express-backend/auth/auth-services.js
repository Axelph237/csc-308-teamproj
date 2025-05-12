import bcrypt from "bcrypt";
import * as jose from "jose";
import {mongooseServices} from "../mongoose-connection.js";

//
// FUNCTIONS FOR SIGNING UP, LOGGING IN, AND LOGGING OUT
//

/**
 * Creates a new account given the user's information.
 * An error is thrown if the account (under the email) already exists.
 * @param username - The user's display name.
 * @param email - The user's unique email.
 * @param password - The password in plaintext to be hashed and saved to the db.
 * @return {Promise<any>} - True when finishing successfully.
 */
export function signup({ username, email, password }) {
    return new Promise((resolve, reject) => {
        if (!username || !email || !password)
            reject("INVALID_DETAILS");

        try {
            const hash = bcrypt.hashSync(password, 10);

            mongooseServices.addUser({
                username, email,
                password: hash,
            })
                .then((res) => {
                    console.log("Created user");
                    resolve(res)
                })
                .catch(err => {
                    console.log("Failed to create user");
                    reject(err);
                });
        }
        catch (e) {
            reject(e);
        }
    });
}

/**
 * Logs a user in. A new access and refresh token are created for the user
 * every login.
 * @param username - The unique username to verify.
 * @param password - The password in plaintext to be compared.
 * @return {Promise<{
 *  accessToken,
 *  refreshToken,
 *  }>} - An object containing `accessToken` and `refreshToken` fields.
 */
export function login(username, password) {
    // BCrypt uses a callback for its compare() function
    // Using an explicit Promise allows us to resolve/reject the Promise
    // inside this callback.
    return new Promise((resolve, reject) => {
        if (!username || !password)
            reject("INVALID_USER");

        // TODO get user's hashed password from mongo
        mongooseServices.findUserByUser(username)
            .then(user => {
                if (!user)
                    reject("USER_NOT_FOUND");

                const hashedPassword = user.password;

                // Compare given password to hashedPassword
                bcrypt.compare(password, hashedPassword, async (err, isMatch) => {
                    // If error is thrown
                    if (err)
                        reject(err);

                    // Check if password matched
                    if (isMatch) {
                        const credentials = await createCredentials(user._id, user.email);

                        resolve(credentials);
                    }
                    else
                        reject("INVALID_PASSWORD")
                });
            })
            .catch(err => reject(err));

    });
}

//
// FUNCTIONS FOR VALIDATING, CREATING, AND REFRESHING ACCESS/REFRESH TOKENS
//

/**
 * Validates a user's credentials.
 * @param credentials - An object containing an `accessToken` and `refreshToken` members.
 * @return {Promise<{
 *     userId,
 *     email
 * } | {
 *     errorMessage
 * }>} - Either returns the user's data (an object containing `userId` and `email`),
 * or an object containing an `errorMessage` string.
 */
export async function validateCredentials(credentials) {
    // Credentials are wrong type
    if (typeof credentials !== "object")
        return { errorMessage: "BAD_CREDENTIALS_TYPE" }

    // Credentials missing access token
    if (!credentials.accessToken)
        return { errorMessage: "ACCESS_TOKEN_MISSING" }

    // Verify payload
    const payload = await verifyJWT(credentials.accessToken);
    if (!payload)
        return { errorMessage: "ACCESS_TOKEN_INVALID" }

    // Verify payload expiration date
    const currDateInSecs = Math.round(Date.now() / 1000);
    if (currDateInSecs > payload.exp)
        return { errorMessage: "ACCESS_TOKEN_EXPIRED" }

    // Return user data
    return {
        userId: payload.sub,
        email: payload.subEmail,
    }
}

/**
 * Creates a new credentials object for a user.
 * @param userId - The user's ObjectId.
 * @param email - The user's email.
 * @return {Promise<{
 *      accessToken: string,
 *      refreshToken: string
 * }>} - An object containing an `accessToken` and `refreshToken`.
 */
export async function createCredentials(userId, email) {
    const accessToken = await generateJWT({
        sub: userId,
        email: email
    })

    const refreshToken = await generateJWT({
        sub: userId
    }, '7days')

    return {
        accessToken,
        refreshToken
    }
}

/**
 * Refreshes a user's access tokens.
 * @param credentials - An object containing an `accessToken` and `refreshToken` members.
 * @return {Promise<{
 *     accessToken,
 *     refreshToken
 * } | false>} - The new credentials. Or, false if the refresh token is expired.
 */
export async function refreshCredentials(credentials) {
    // Credentials are wrong type
    if (typeof credentials !== "object" || !credentials.refreshToken || !credentials.accessToken)
        throw new Error("Missing refresh token");

    // Get refresh token
    const refreshPayload = await verifyJWT(credentials.refreshToken);
    if (!refreshPayload)
        throw new Error("Invalid refresh token");

    // Get access token
    const accessPayload = await verifyJWT(credentials.accessToken);
    if (!accessPayload)
        throw new Error("Invalid access token");

    /// Verify refresh token expiration date
    const currDateInSecs = Math.round(Date.now() / 1000);
    if (currDateInSecs > refreshPayload.exp)
        return false;

    // Grant new access token
    const newToken = await generateJWT({ ...accessPayload })

    return {
        accessToken: newToken,
        refreshToken: credentials.refreshToken
    }
}

//
// JWT HELPER FUNCTIONS
//

/**
 * Generates a JWT valid on this server.
 * @param payload - A set of custom claims to add to the JWT.
 * @param exp - Time until token expiration. Defaults to 1 day.
 */
async function generateJWT(payload, exp  = '1day') {
    const encoder = new TextEncoder();
    const secret = encoder.encode(process.env.JWT_SECRET);

    return await new jose.SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt(Date.now())
        .setIssuer(process.env.JWT_ISSUER)
        .setAudience(process.env.JWT_AUDIENCE)
        .setExpirationTime(exp)
        .sign(secret);
}

/**
 * Verifies that a JWT is valid on this server.
 * @param jwt - the JWT to verify.
 * @returns {Promise<object>} - the JWT payload, or false if the JWT fails verification.
 */
async function verifyJWT(jwt) {
    try {
        const encoder = new TextEncoder();
        const secret = encoder.encode(process.env.JWT_SECRET);

        const {
            payload
        } = await jose.jwtVerify(jwt, secret, {
            issuer: process.env.JWT_ISSUER,
            audience: process.env.JWT_AUDIENCE,
        })

        return payload;
    }
    catch (e) {
        return false;
    }
}