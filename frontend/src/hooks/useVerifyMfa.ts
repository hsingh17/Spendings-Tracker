import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import queryClient from "../config/QueryClientConfig";
import { POST, VERIFY_MFA_ROUTE } from "../utils/constants";
import fetchRequestWrapper from "../utils/fetch-utils";

type VerifyMfaRequest = {
  totpCode?: string;
  recoveryCode?: string;
};

async function postVerifyMfa(verifyMfaRequest: VerifyMfaRequest) {
  return await fetchRequestWrapper<void>(
    VERIFY_MFA_ROUTE,
    POST,
    JSON.stringify(verifyMfaRequest),
  );
}

export default function useVerifyMfa(onSuccess: VoidFunction) {
  return useMutation({
    mutationFn: (verifyMfaRequest: VerifyMfaRequest) =>
      postVerifyMfa(verifyMfaRequest),
    onSuccess: async () => {
      await queryClient.refetchQueries(["user"]);
      await queryClient.refetchQueries(["currency"]);
      onSuccess();
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Unable to verify MFA");
      }
    },
  });
}
