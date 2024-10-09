import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import HttpError from "../error/HttpError";
import { CREATE_ACCT_ROUTE, POST, VERIFY_ACCT_PAGE } from "../utils/constants";
import fetchRequestWrapper from "../utils/fetch-utils";

type CreateAccountRequest = {
  username: string;
  password: string;
  email: string;
};

async function postCreateAccount(createAccountRequest: CreateAccountRequest) {
  return await fetchRequestWrapper(
    CREATE_ACCT_ROUTE,
    POST,
    JSON.stringify(createAccountRequest),
  );
}

export default function useCreateAccount() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (createAccountRequest: CreateAccountRequest) => {
      const promise = postCreateAccount(createAccountRequest);
      toast.promise(
        promise,
        {
          loading: "Creating your account",
          error: (err: HttpError) => {
            if (err.status >= 500) {
              return "We were unable to create your account. Try again later!";
            }

            return err.message;
          },
          success: () => {
            navigate(
              `${VERIFY_ACCT_PAGE}?username=${createAccountRequest.username}`,
            );
            return "Please check your email to complete the registration process.";
          },
        },
        {
          position: "bottom-center",
        },
      );

      return promise;
    },
  });
}
