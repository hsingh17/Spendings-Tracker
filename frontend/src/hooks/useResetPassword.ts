import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { PASSWORD_RESET_ROUTE, PATCH } from "../utils/constants";
import fetchRequestWrapper from "../utils/fetch-utils";
import { ResetPasswordRequest } from "../utils/types";

async function patchResetPassword(
  username: string,
  resetPasswordRequest: ResetPasswordRequest,
) {
  return await fetchRequestWrapper(
    `${PASSWORD_RESET_ROUTE}/${username}`,
    PATCH,
    JSON.stringify(resetPasswordRequest),
  );
}

export default function useResetPassword(
  username: string,
  onSuccess: () => void,
) {
  return useMutation({
    mutationFn: (resetPasswordRequest: ResetPasswordRequest) => {
      const promise = patchResetPassword(username, resetPasswordRequest);
      toast.promise(
        promise,
        {
          loading: "Resetting password",
          error: "Unable to reset your password!",
          success: `Reset password for ${username}. Redirecting to login page.`,
        },
        {
          position: "bottom-center",
        },
      );

      return promise;
    },
    onSuccess: onSuccess,
  });
}
