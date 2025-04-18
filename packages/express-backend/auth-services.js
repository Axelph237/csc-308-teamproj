import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET;

//
// FUNCTIONS FOR SIGNING UP, LOGGING IN, AND LOGGING OUT
//

/**
 * Creates a new account given the user's information.
 * An error is thrown if the account (under the email) already exists.
 * @param username - The user's display name.
 * @param email - The user's unique email.
 * @param password - The password in plaintext to be hashed and saved to the db.
 * @return {Promise<string>} - The access token of type `bearer` for the user.
 */
export async function signup({ username, email, password }) {
    await bcrypt.hash(password, 12, (err, hash) => {
        if (err)
            return console.error(err);

        // TODO create user document and upload hashed password
    });
}

/**
 * Logs a user in. A new access and refresh token are created for the user
 * every login.
 * @param userId - The user to verify.
 * @param password - The password in plaintext to be compared.
 * @return {Promise<{
 *  accessToken,
 *  accessTokenExpiresAt,
 *  refreshToken,
 *  refreshTokenExpiresAt
 *  } | string>} - An object containing `accessToken`, `accessTokenExpiresAt`, `refreshToken`,
 *  and `refreshTokenExpiresAt` fields. Or returns a string with an error message.
 */
export function login(userId, password) {
    // BCrypt uses a callback for its compare() function
    // Using an explicit Promise allows us to resolve/reject the Promise
    // inside this callback.
    return new Promise((resolve, reject) => {

        // TODO get user's hashed password from mongo
        const hashedPassword = "";

        bcrypt.compare(password, hashedPassword, (err, isMatch) => {
            // If error is thrown
            if (err)
                reject(err);

            // TODO generate credentials for user on login

            // Check if password matched
            if (isMatch)
                resolve({
                    accessToken: "",
                    accessTokenExpiresAt: "",
                    refreshToken: "",
                    refreshTokenExpiresAt: ""
                });
            else
                reject("INVALID PASSWORD")
        })

    })
}

//
// FUNCTIONS FOR VALIDATING, CREATING, AND REFRESHING ACCESS/REFRESH TOKENS
//

export async function validateCredentials() {

}

export async function createCredentials(userId, password) {

}

// Refresh credentials
export async function refreshCredentials() {

}

//
// JWT HELPER FUNCTIONS
//

/**
 * Generates a JWT valid on this server.
 * @param claims - A set of custom claims to add to the JWT.
 */
async function generateJWT(claims) {

}

/**
 * Verifies that a JWT is valid on this server.
 * @param jwt - the JWT to verify.
 */
function verifyJWT(jwt) {

}