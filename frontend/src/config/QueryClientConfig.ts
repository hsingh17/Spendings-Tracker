import { QueryCache, QueryClient } from "@tanstack/react-query";
import HttpError from "../error/HttpError";
import { Constants } from "../utils/constants";

const QueryClientConfig = new QueryClient({  
  queryCache: new QueryCache({
    onError: (error) => {
      if (!(error instanceof HttpError)) {
        return;
      }

      const curPath: string = window.location.pathname;

      if (!curPath.includes(Constants.LOGIN_PAGE) && error.status === 401) { // 401 -> Redirect back to login page if not already there
        window.location.replace(Constants.LOGIN_PAGE);
      }
    }
  }),
  defaultOptions: {
    queries: {
      useErrorBoundary: (error) => { // Only want server errors (5xx) to be thrown to the error boundary.
        if (!(error instanceof HttpError)) {
          return false;
        }
        return error.status >= 500;
      }, 
      refetchOnWindowFocus: false, // Don't want to make API calls when window is refocused
      retry: false, // Don't want to retry failed API calls
      staleTime: 300000, // 5 minutes,
      cacheTime: 300000 * 2 // 10 minutes
    }
  }
});

export default QueryClientConfig;