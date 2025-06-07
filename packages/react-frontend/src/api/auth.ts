import {ApiError, fetchWithParse} from "@src/api/backend";

export async function signup(
  email: string,
  username: string,
  password: string,
): Promise<string> {
  const url = "/auth/signup";
  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      username,
      password,
    }),
  };

  return await fetchWithParse(url, init);
}

export async function login(
  username: string,
  password: string,
): Promise<string> {
  const url = "/auth/login";
  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  };

  return await fetchWithParse(url, init);
}
