import { QueryCache, QueryClient } from "@tanstack/react-query";
import HttpError from "../error/HttpError";
import { LOGIN_PAGE, UNAUTHENTICATED_PAGES } from "../utils/constants";

const QueryClientConfig = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      if (!(error instanceof HttpError)) {
        return;
      }

      const curPath: string = window.location.pathname;
      // Trying to access a page that requires authentication but user not authenticated
      if (
        !UNAUTHENTICATED_PAGES.includes(curPath) &&
        error.status >= 400 &&
        error.status < 500
      ) {
        // 401 -> Redirect back to login page if not already there
        window.location.replace(LOGIN_PAGE);
      }
    },
  }),
  defaultOptions: {
    queries: {
      useErrorBoundary: (error) => {
        // Only want server errors (5xx) to be thrown to the error boundary.
        if (!(error instanceof HttpError)) {
          return false;
        }

        return error.status >= 500;
      },
      refetchOnWindowFocus: false, // Don't want to make API calls when window is refocused
      retry: false, // Don't want to retry failed API calls
    },
  },
});

export default QueryClientConfig;
