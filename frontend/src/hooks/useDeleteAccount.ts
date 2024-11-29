import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import queryClient from "../config/QueryClientConfig";
import { DELETE, DELETE_ACCT_ROUTE, LOGIN_PAGE } from "../utils/constants";
import fetchRequestWrapper from "../utils/fetch-utils";

async function deleteAccount() {
  return await fetchRequestWrapper(DELETE_ACCT_ROUTE, DELETE);
}

export default function useDeleteAccount() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => {
      const promise = deleteAccount();
      toast.promise(
        promise,
        {
          loading: "Deleting your account",
          error: () => {
            return "We were unable to log you out.\nTry again later!";
          },
          success: () => {
            navigate(LOGIN_PAGE);
            // Remove the user key from cache so we don't keep any cached user data
            queryClient.removeQueries(["user"]);

            return "Succesfully deleted your account";
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
