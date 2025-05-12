import {ApiError} from "@src/api/backend";

// IF GETTING 404 ERRORS MAKE SURE THIS IS CORRECT
const BACKEND_DOMAIN = "http://localhost:8001";

export async function signup(email: string, username: string, password: string): Promise<string> {
    const url = BACKEND_DOMAIN + "/auth/signup"
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            username,
            password
        })
    };

    const response =  await fetch(url, init);

    const data = await response.text();
    if (!response.ok)
        throw new ApiError(data, url, init);

    return data;
}

export async function login(username: string, password: string): Promise<string> {
    const url = "/api/auth/login"
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password
        })
    };

    const response =  await fetch(url, init);

    const data = await response.text();
    if (!response.ok)
        throw new ApiError(data, url, init);

    return data;
}