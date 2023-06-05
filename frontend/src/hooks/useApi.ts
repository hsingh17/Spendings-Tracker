import { UseApiResponse } from "../utils/types";
import { ApiResponse } from "../utils/types";
import fetchRequestWrapper from "../utils/fetch-utils";
import { Constants } from "../utils/constants";

function fetchData<T>(apiUrl: string, method: string, body: string): () => ApiResponse<T> {
  let result: ApiResponse<T>;
  let error: Error;
  let status: Constants.PROMISE_STATES = Constants.PROMISE_STATES.PENDING;

  const promise: Promise<void> = fetchRequestWrapper<T>(apiUrl, method, body)
    .then((res) => {
      if (!res.ok) {
        status = Constants.PROMISE_STATES.REJECTED;
        error = new Error(res.message);
      }

      status = Constants.PROMISE_STATES.FUFILLED;
      result = res;
    })
    .catch((err) => {
      status = Constants.PROMISE_STATES.REJECTED;
      error = err;
    });

    return () => {
      switch (status) {
        case Constants.PROMISE_STATES.PENDING:
          throw promise;
        case Constants.PROMISE_STATES.FUFILLED:
          return result;
        case Constants.PROMISE_STATES.REJECTED:
        default:
          throw error;
      }
    }
};

function useApi<T>(apiUrl: string, method: string, body:string = "") : UseApiResponse<T> {
  const response = fetchData<T>(apiUrl, method, body)();

  return {
    response: response
  };
};

export default useApi;