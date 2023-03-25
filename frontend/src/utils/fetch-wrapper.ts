import { FetchResponseWrapper } from "./types";

const makeFetchRequestWrapper = async <T>(apiUrl: string, method: string, body: string) : Promise<FetchResponseWrapper<T>> => {
    switch (method) {
        case "GET":
            return makeGetRequest(apiUrl);
        case "POST":
            return makePostRequest(apiUrl, body);
        default:
            return createErrorResponse("Response was null.");
    }
}

const makePostRequest = async <T>(apiUrl: string, body: string) : Promise<FetchResponseWrapper<T>> => {
    const response = await fetch(apiUrl, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: body
    });
    
    return validateResponse(response);
}

const makeGetRequest = async <T>(apiUrl: string) : Promise<FetchResponseWrapper<T>> => {
    const response = await fetch(apiUrl, {
        method: "GET",
        credentials: "include",
    });

    return validateResponse(response);
}

const validateResponse = async<T>(response: Response) : Promise<FetchResponseWrapper<T>> => {
    if (!response.ok) { 
        // TODO: Should be an error object
        let errorMessage: string = await response.text();
        return createErrorResponse(errorMessage);
    }

    
    let responseObj: T = await response.json() as T;
    return createValidResponse(responseObj);
}

const createErrorResponse = <T>(errorMessage: string) : FetchResponseWrapper<T> => {
    return {
        ok: false,
        obj: null,
        error: errorMessage
    };
}

const createValidResponse = <T>(responseObj: T) : FetchResponseWrapper<T> => {
    return {
        ok: true,
        obj: responseObj,
        error: ""
    };
}

export default makeFetchRequestWrapper;