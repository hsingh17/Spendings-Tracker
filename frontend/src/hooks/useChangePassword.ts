import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CHANGE_PASSWORD_ROUTE, LOGIN_PAGE, PATCH } from "../utils/constants";
import fetchRequestWrapper from "../utils/fetch-utils";

type ChangePasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

async function patchChangePassword(
  changePasswordRequest: ChangePasswordRequest
) {
  return await fetchRequestWrapper(
    `${CHANGE_PASSWORD_ROUTE}`,
    PATCH,
    JSON.stringify(changePasswordRequest)
  );
}

export default function useChangePassword() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (changePasswordRequest: ChangePasswordRequest) => {
      const promise = patchChangePassword(changePasswordRequest);
      toast.promise(
        promise,
        {
          loading: "Changing your password",
          error: "Unable to change your password! Please confirm if your current password is correct.",
          success: `Changed your password. Please sign back in.`,
        },
        {
          position: "bottom-center",
        }
      );

      return promise;
    },
    onSuccess: () => navigate(LOGIN_PAGE),
  });
}
