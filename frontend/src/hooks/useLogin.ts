import { useMutation } from "@tanstack/react-query";
import { AUTH_LOGIN_ROUTE, POST } from "../utils/constants";
import fetchRequestWrapper from "../utils/fetch-utils";
import { User, UserFormData } from "../utils/types";

async function postLogin(formData: UserFormData) {
  return await fetchRequestWrapper<User>(
    AUTH_LOGIN_ROUTE,
    POST,
    JSON.stringify(formData),
  );
}

export default function useLogin(onSuccess: () => void, onError: () => void) {
  return useMutation({
    mutationFn: (formData: UserFormData) => postLogin(formData),
    onSuccess: onSuccess,
    onError: onError,
  });
}
