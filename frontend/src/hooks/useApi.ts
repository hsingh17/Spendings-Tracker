import { useEffect, useState } from "react";
import { UseApiResponse } from "../utils/types";
import { FetchResponseWrapper } from "../utils/types";

// #######################################################################################
// #######################################################################################
//                                      HOOK
// #######################################################################################
// #######################################################################################

function useApi<T>(apiUrl: string, method: string, body:string = "") : UseApiResponse<T> {
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ response, setResponse ] = useState<FetchResponseWrapper<T> | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response: FetchResponseWrapper<T> = await fetchRequestWrapper<T>(apiUrl, method, body);
      setLoading(false);
      setResponse(response);
    };

    fetchData();
  }, [apiUrl]);

  return {
    loading: loading,
    response: response
  };
};

// #######################################################################################
// #######################################################################################
//                                      HELPERS
// #######################################################################################
// #######################################################################################

async function fetchRequestWrapper<T>(apiUrl: string, method: string, body: string) : Promise<FetchResponseWrapper<T>> {
  switch (method) {
      case "GET":
      case "POST":
      case "DELETE":
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
  
  if (method !== "GET") {
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


export default useApi;