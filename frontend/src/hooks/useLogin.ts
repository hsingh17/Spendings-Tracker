import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  AUTH_LOGIN_ROUTE,
  MFA_SETUP_PAGE,
  MFA_VERIFY_PAGE,
  POST,
} from "../utils/constants";
import fetchRequestWrapper from "../utils/fetch-utils";
import { ApiResponse, ExternalUserType, User } from "../utils/types";

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
    onSuccess: (data: ApiResponse<User>) => {
      const hasMfa = data.data?.hasMfa;

      if (!hasMfa) {
        navigate(MFA_SETUP_PAGE);
      } else {
        navigate(MFA_VERIFY_PAGE);
      }
    },
    onError: onError,
  });
}
