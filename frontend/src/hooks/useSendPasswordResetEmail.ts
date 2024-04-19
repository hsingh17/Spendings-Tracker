import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { POST, SEND_PASSWORD_RESET_EMAIL_ROUTE } from "../utils/constants";
import fetchRequestWrapper from "../utils/fetch-utils";

async function postSendPasswordResetEmail(username: string) {
  return await fetchRequestWrapper(
    `${SEND_PASSWORD_RESET_EMAIL_ROUTE}/${username}`,
    POST,
  );
}

export default function useSendPasswordResetEmail() {
  return useMutation({
    mutationFn: (username: string) => {
      const promise = postSendPasswordResetEmail(username);
      toast.promise(promise, {
        loading: "Sending you password reset instructions",
        error:
          "We couldn't send you an email. Make sure the username is correct!",
        success: `Succesfully sent an email associated to your username ${username}. Please check your email.`,
      });

      return promise;
    },
  });
}
