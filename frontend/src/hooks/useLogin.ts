import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import queryClient from "../config/QueryClientConfig";
import { AUTH_LOGIN_ROUTE, DASHBOARD_PAGE, POST } from "../utils/constants";
import fetchRequestWrapper from "../utils/fetch-utils";
import { ExternalUserType, User } from "../utils/types";

type LoginRequest = {
  username?: string;
  password?: string;
  oAuthCredential?: string;
};

async function postLogin(
  formData: LoginRequest,
  externalUserType?: ExternalUserType,
) {
  let url = AUTH_LOGIN_ROUTE;
  if (externalUserType !== undefined) {
    url += `?external-user-type=${externalUserType}`;
  }

  return await fetchRequestWrapper<User>(url, POST, JSON.stringify(formData));
}

export default function useLogin(
  onError: () => void,
  externalUserType?: ExternalUserType,
) {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (formData: LoginRequest) =>
      postLogin(formData, externalUserType),
    onSuccess: () => {
      navigate(DASHBOARD_PAGE);
      // Remove the user key from cache so we get the new logged in user
      queryClient.refetchQueries(["user"]);
    },
    onError: onError,
  });
}
