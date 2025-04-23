import {User} from "types/user";
import {Diary} from "types/diary";
import {Page} from "types/page";
import {ObjectId} from "types/objectId";

export class ApiError extends Error {
    readonly url: string;
    readonly request: RequestInit;
    constructor(message: string, url?: string, request?: RequestInit) {
        super(message);
        this.url = url;
        this.request = request;
    }
}

/**
 * GET /users/:id
 */
export async function getUser(): Promise<User> {
    const url = "/users"
    const init = {
        method: "GET",
        headers: {
            "Authorization": "Bearer BAD"
        }
    };

    const response =  await fetch(url, init);

    const body = await response.json();
    if (!response.ok)
        throw new ApiError(body.message, url, init);

    return body;
}

/**
 * GET /users/:id/diaries -> TODO update to /diaries on backend
 */
export async function getUserDiaries(): Promise<Diary[]> {
    const url = "/diaries";
    const init = {
        method: "GET",
        headers: {
            "Authorization": "Bearer BAD"
        }
    };

    const response =  await fetch(url, init);

    const body = await response.json();
    if (!response.ok)
        throw new ApiError(body.message, url, init);

    return body;
}

/**
 * GET /diaries/:diaryId/pages
 * @param diaryId - The id of the diary to retrieve data from.
 */
export async function getDiaryPages(diaryId: ObjectId): Promise<Page[]> {
    const url = `/diaries/${diaryId}/pages`;
    const init = {
        method: "GET",
        headers: {
            "Authorization": "Bearer BAD"
        }
    };

    const response =  await fetch(url, init);

    const body = await response.json();
    if (!response.ok)
        throw new ApiError(body.message, url, init);

    return body;
}

/**
 * GET /diaries/:diaryId/pages/:pageId
 * @param diaryId - The diary the page belongs to.
 * @param pageId - The id of the page.
 */
export async function getPage(diaryId: ObjectId, pageId: ObjectId): Promise<Page> {
    const url = `/diaries/${diaryId}/pages/${pageId}`;
    const init = {
        method: "GET",
        headers: {
            "Authorization": "Bearer BAD"
        }
    };

    const response =  await fetch(url, init);

    const body = await response.json();
    if (!response.ok)
        throw new ApiError(body.message, url, init);

    return body;
}

/**
 * POST /users
 * @param user - The user to create.
 */
export async function createUser(user: Omit<User, "_id" | "diariesID">): Promise<User> {
    const url = "/users";
    const init = {
        method: "POST",
        headers: {
            "Authorization": "Bearer BAD"
        },
        body: JSON.stringify(user)
    };

    const response =  await fetch(url, init);

    const body = await response.json();
    if (!response.ok)
        throw new ApiError(body.message, url, init);

    return body;
}

/**
 * POST /users/:id/diaries -> TODO update url to /diaries on backend
 * @param diary - The diary to create.
 */
export async function createDiary(diary: Omit<Diary, "_id">): Promise<Diary> {
    const url = "/diaries";
    const init = {
        method: "POST",
        headers: {
            "Authorization": "Bearer BAD"
        },
        body: JSON.stringify(diary)
    };

    const response =  await fetch(url, init);

    const body = await response.json();
    if (!response.ok)
        throw new ApiError(body.message, url, init);

    return body;
}

/**
 * POST /diaries/:diaryId/pages
 * @param page - The page to create.
 * @param diaryId - The id of the diary to add the page to.
 */
export async function createPage(diaryId: ObjectId, page: Omit<Page, "_id">): Promise<Page> {
    const url = `/diaries/${diaryId}/pages`;
    const init = {
        method: "POST",
        headers: {
            "Authorization": "Bearer BAD"
        },
        body: JSON.stringify(page)
    };

    const response =  await fetch(url, init);

    const body = await response.json();
    if (!response.ok)
        throw new ApiError(body.message, url, init);

    return body;
}


/**
 * GET random page
 *
 */
export async function findRandomPage(): Promise<Page> {
    const url = `/diaries/`;
    const init = {
        method: "GET",
        headers: {
            "Authorization": "Bearer BAD"
        }
    };

    const response =  await fetch(url, init);

    const body = await response.json();
    if (!response.ok)
        throw new ApiError(body.message, url, init);

    return body;
}

/**
 * PUT
 * @param userId - the user to find
 * @param password - the password to edit/change
 */
export async function editPassword(userId: ObjectId, password: string): Promise<User> {
    const url = `/users/${userId}/password`;
    const init = {
        method: "PUT",
        headers: {
            "Authorization": "Bearer BAD",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(password)
    };

    const response =  await fetch(url, init);
    const body = await response.json();
    if(!response.ok)
        throw new ApiError(body.message, url, init);
    return body;

}

/**
 * PUT
 * @param user - the user with new profile picture
 * @param userId - the user to find
 */
export async function editUser(user: Omit<User, "_id" | "password" | "diariesID">, userId: ObjectId): Promise<User> {
    const url = `/users/${userId}`;
    const init = {
        method: "PUT",
        headers: {
            "Authorization": "Bearer BAD",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    };

    const response =  await fetch(url, init);
    const body = await response.json();
    if(!response.ok)
        throw new ApiError(body.message, url, init);
    return body;

}
