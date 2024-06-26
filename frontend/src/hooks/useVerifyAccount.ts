import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import QueryClientConfig from "../config/QueryClientConfig";
import { DASHBOARD_PAGE, PUT, VERIFY_ACCT_ROUTE } from "../utils/constants";
import fetchRequestWrapper from "../utils/fetch-utils";
import { VerifyAcctRequest } from "../utils/types";

async function putVerifyAcct(
  username: string,
  verifyAcctReq: VerifyAcctRequest,
) {
  return await fetchRequestWrapper(
    `${VERIFY_ACCT_ROUTE}/${username}`,
    PUT,
    JSON.stringify(verifyAcctReq),
  );
}

export default function useVerifyAccount(username: string) {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (verifyAcctReq: VerifyAcctRequest) => {
      const promise = putVerifyAcct(username, verifyAcctReq);
      toast.promise(
        promise,
        {
          loading: "Verifying account",
          error:
            "Unable to verify your account. Make sure the code is correct!",
          success: `Succesfully verified your account. Redirecting to the dashboard`,
        },
        {
          position: "bottom-center",
        },
      );

      return promise;
    },

    onSuccess: () => {
      navigate(DASHBOARD_PAGE);
      // Invalidate the user key from cache so we get the new logged in user
      QueryClientConfig.removeQueries(["user"]);
    },
  });
}
