import { User } from "types/user";
import { Diary } from "types/diary";
import { Page } from "types/page";
import { ObjectId } from "types/objectId";
import { Comment } from "types/page";

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
  const url = "/users/account";
  const init: RequestInit = {
    method: "GET",
    credentials: "include",
  };

  return await fetchWithParse(url, init);
}

/**
 * GET /users/:id/diaries -> TODO update to /diaries on backend
 */
export async function getUserDiaries(): Promise<Diary[]> {
  const url = "/users/account/diaries";
  const init: RequestInit = {
    method: "GET",
    credentials: "include",
  };

  return await fetchWithParse(url, init);
}

/**
 * GET /diaries/:diaryId/pages
 * @param diaryId - The id of the diary to retrieve data from.
 */
export async function getDiaryPages(diaryId: ObjectId): Promise<Page[]> {
  const url = `/diaries/${diaryId}/pages`;
  const init: RequestInit = {
    method: "GET",
    credentials: "include",
  };

  return await fetchWithParse(url, init);
}

/**
 * GET /diaries/:diaryId/pages/:pageId
 * @param diaryId - The diary the page belongs to.
 * @param pageId - The id of the page.
 */
export async function getPage(
  diaryId: ObjectId,
  pageId: ObjectId,
): Promise<Page> {
  const url = `/diaries/${diaryId}/pages/${pageId}`;
  const init: RequestInit = {
    method: "GET",
    credentials: "include",
  };

  return await fetchWithParse(url, init);
}

/**
 * POST /users
 * @param user - The user to create.
 */
export async function createUser(
  user: Omit<User, "_id" | "diariesID">,
): Promise<User> {
  const url = "/users";
  const init: RequestInit = {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  return await fetchWithParse(url, init);
}

/**
 * POST /users/:id/diaries -> TODO update url to /diaries on backend
 * @param diary - The diary to create.
 */
export async function createDiary(diary: Omit<Diary, "_id">): Promise<Diary> {
  const url = "/users/account/diaries";
  const init: RequestInit = {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(diary),
  };

  return await fetchWithParse(url, init);
}

/**
 * POST /diaries/:diaryId/pages
 * @param page - The page to create.
 * @param diaryId - The id of the diary to add the page to.
 */
export async function createPage(
  diaryId: ObjectId,
  page: Omit<Page, "_id">,
): Promise<Page> {
  const url = `/diaries/${diaryId}/pages`;
  const init: RequestInit = {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(page),
  };

  return await fetchWithParse(url, init);
}

/**
 * GET /diaries/
 *
 */
export async function findRandomPage(): Promise<{
  parentDiaryId: string;
  page: Page;
}> {
  const url = "/diaries/random";
  const init: RequestInit = {
    method: "GET",
    credentials: "include",
  };

  return await fetchWithParse(url, init);
}

/**
 * PUT /users/:id/password
 * @param userId - the user to find
 * @param password - the password to edit/change
 */
export async function editPassword(
  userId: ObjectId,
  password: string,
): Promise<User> {
  const url = `/users/${userId}/password`;
  const init: RequestInit = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ password }),
  };

  return await fetchWithParse(url, init);
}

/**
 * PUT /users/:id
 * @param user - the user with new profile picture
 * @param userId - the user to find
 */
export async function editUser(
  user: Omit<User, "_id" | "password" | "diariesID">,
  userId: ObjectId,
): Promise<User> {
  const url = `/users/${userId}`;
  const init: RequestInit = {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  return await fetchWithParse(url, init);
}

/**
 * DELETE /diaries
 * @param pageId
 * @param diaryId
 */
export async function removePage(
  pageId: ObjectId,
  diaryId: ObjectId,
): Promise<any> {
  const url = `/diaries/${diaryId}/pages/${pageId}`;
  const init: RequestInit = {
    method: "DELETE",
    credentials: "include",
  };

  return await fetchWithParse(url, init);
}

/**
 * PUT /diaries/:diaryId/pages/:pageId
 * Updates a page inside a diary
 *
 * @param diaryId - The ID of the diary
 * @param pageId - The ID of the page to update
 * @param pageData - The updated page fields (title, body, date, etc.)
 * @returns The updated Page object
 */
export async function editPage(
  diaryId: string,
  pageId: string,
  pageData: Partial<Omit<Page, "_id">>, // allow updating any fields except _id
): Promise<Page> {
  const url = `/diaries/${diaryId}/pages/${pageId}`;

  const init: RequestInit = {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pageData),
  };

  return await fetchWithParse(url, init);
}

export async function postComment(
  diaryId: ObjectId,
  pageId: ObjectId,
  comment: string,
): Promise<Page> {
  const url = `/diaries/${diaryId}/pages/${pageId}/comments`;
  const init: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ comment }),
    credentials: "include",
  };

  return fetchWithParse(url, init);
}

export async function addLike(
  diaryId: ObjectId,
  pageId: ObjectId,
): Promise<Page> {
  const url = `/diaries/${diaryId}/pages/${pageId}/likes`;
  const init: RequestInit = {
    method: "POST",
    credentials: "include",
  };

  return fetchWithParse(url, init);
}

export async function fetchWithParse(url: string, init: RequestInit): Promise<any> {
  const response = await fetch(__API_TARGET__ + url, init);

  let body: any;
  try {
    const contentType = response.headers.get('Content-Type') || '';
    if (contentType.includes('application/json')) {
      body = response.json();
    } else {
      body = response.text();
    }
  } catch (e) {
    console.error("Failed to parse JSON:", body);
    throw new ApiError("Unexpected server response: " + e.toString(), url, init);
  }

  if (!response.ok) {
    throw new ApiError(body.message, url, init);
  }

  return body;
}
