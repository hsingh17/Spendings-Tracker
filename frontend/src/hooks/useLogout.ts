import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import queryClient from "../config/QueryClientConfig";
import { AUTH_LOGOUT_ROUTE, LOGIN_PAGE, POST } from "../utils/constants";
import fetchRequestWrapper from "../utils/fetch-utils";

async function postLogout() {
  return await fetchRequestWrapper(AUTH_LOGOUT_ROUTE, POST);
}

export default function useLogout() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => {
      const promise = postLogout();
      toast.promise(
        promise,
        {
          loading: "Logging out",
          error: () => {
            return "We were unable to log you out.\nTry again later!";
          },
          success: () => {
            navigate(LOGIN_PAGE);
            // Remove the user key from cache so we don't keep any cached user data
            queryClient.removeQueries(["user"]);

            return "Succesfully logged out";
          },
        },
        {
          position: "bottom-center",
          className: "text-center",
        },
      );

      return promise;
    },
  });
}
