import HttpError from "../error/HttpError";
import { DELETE, GET, POST, PUT } from "./constants";
import { ApiResponse } from "./types";

async function fetchRequestWrapper<T>(
  apiUrl: string,
  method: string,
  body: string = "",
): Promise<ApiResponse<T>> {
  switch (method) {
    case GET:
    case POST:
    case DELETE:
    case PUT:
      return makeRequest(apiUrl, method, body);
    default:
      return {
        ok: false,
        httpStatus: 400,
        timestamp: new Date().toISOString(),
        message: "Incorrect HTTP Method passed!",
        metadata: null,
        data: null,
      };
  }
}

async function makeRequest<T>(
  apiUrl: string,
  method: string,
  body: string,
): Promise<ApiResponse<T>> {
  const options: RequestInit = {
    method: method,
    credentials: "include",
  };

  if (method !== GET && body) {
    // This request may require a body
    options.body = body;
    options.headers = {
      "Content-Type": "application/json",
    };
  }

  const promise = await fetch(apiUrl, options);
  const response: ApiResponse<T> = await promise.json();
  // We need to throw an error because React-Query needs a rejected promise to handle errors
  // properly and fetch does not do that by default
  if (!response.ok) {
    throw new HttpError(response.httpStatus, response.message);
  }

  return response;
}

export default fetchRequestWrapper;
