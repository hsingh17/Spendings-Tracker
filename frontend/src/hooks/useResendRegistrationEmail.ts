import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { POST, RESEND_ACCT_REG_EMAIL_ROUTE } from "../utils/constants";
import fetchRequestWrapper from "../utils/fetch-utils";

async function postResendPasswordRegistrationEmail(username: string) {
  return await fetchRequestWrapper(
    `${RESEND_ACCT_REG_EMAIL_ROUTE}/${username}`,
    POST,
  );
}

export default function useResendRegistrationEmail(username: string) {
  return useMutation({
    mutationFn: () => {
      const promise = postResendPasswordRegistrationEmail(username);
      toast.promise(
        promise,
        {
          loading: "Resending you account registration instructions",
          error: "We were unable to send you an email. Try again later!",
          success: `Succesfully sent an email associated to your username ${username}. Please check your email.`,
        },
        {
          position: "bottom-center",
        },
      );

      return promise;
    },
  });
}
