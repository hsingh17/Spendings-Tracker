import { Constants } from "./constants";
import { FetchResponseWrapper } from "./types";

async function fetchRequestWrapper<T>(apiUrl: string, method: string, body: string) : Promise<FetchResponseWrapper<T>> {
    switch (method) {
        case Constants.GET:
        case Constants.POST:
        case Constants.DELETE:
            return makeRequest(apiUrl, method, body);            
        default:
            return createErrorResponse("Not a valid request method!");
    }
  }
  
  async function makeRequest <T>(apiUrl: string, method: string, body: string) : Promise<FetchResponseWrapper<T>> {
    let options: RequestInit = {
        method: method,
        credentials: "include"
    };
    
    if (method !== Constants.GET) { // This request requires body
        options.body = body;
        options.headers = {
            "Content-Type": "application/json"  
        };
    }
  
    const response = await fetch(apiUrl, options);
    
    return validateResponse(response);
  }
  
  async function validateResponse<T>(response: Response) : Promise<FetchResponseWrapper<T>> {
    if (!response.ok) { 
        // TODO: Should be an error object
        let errorMessage: string = await response.text();
        return createErrorResponse(errorMessage);
    }
  
    
    let responseObj: T = await response.json() as T;
    return createValidResponse(responseObj);
  }
  
  function createErrorResponse<T>(errorMessage: string) : FetchResponseWrapper<T> {
    return {
        ok: false,
        obj: null,
        error: errorMessage
    };
  }
  
  function createValidResponse<T>(responseObj: T) : FetchResponseWrapper<T> {
    return {
        ok: true,
        obj: responseObj,
        error: ""
    };
  }
  
  export default fetchRequestWrapper;