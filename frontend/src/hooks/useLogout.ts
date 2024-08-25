import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import QueryClientConfig from "../config/QueryClientConfig";
import { AUTH_LOGOUT_ROUTE, LOGIN_PAGE, POST } from "../utils/constants";
import fetchRequestWrapper from "../utils/fetch-utils";

async function postLogout() {
  return await fetchRequestWrapper(AUTH_LOGOUT_ROUTE, POST);
}

export default function useLogout() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => postLogout(),
    onSuccess: () => {
      navigate(LOGIN_PAGE);
      // Invalidate the user key from cache so we don't keep any cached user data
      QueryClientConfig.removeQueries(["user"]);
    },
    onError: () => {
      toast.error("An unexpected error occurred while logging out!", {
        position: "bottom-center",
      });
    },
  });
}
