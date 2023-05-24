import { Constants } from "./constants";
import { ApiResponse } from "./types";

async function fetchRequestWrapper<T>(apiUrl: string, method: string, body: string) : Promise<ApiResponse<T>> {
    switch (method) {
        case Constants.GET:
        case Constants.POST:
        case Constants.DELETE:
            return makeRequest(apiUrl, method, body);            
        default:
            return { ok: false, httpStatus: 400, timestamp: new Date().toISOString(), message: "Incorrect HTTP Method passed!", metadata: null, data: null };
    }
  }
  
  async function makeRequest <T>(apiUrl: string, method: string, body: string) : Promise<ApiResponse<T>> {
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
    
    return response.json();
  }
  
  export default fetchRequestWrapper;