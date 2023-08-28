import { useMutation } from "@tanstack/react-query";
import { Constants } from "../utils/constants";
import fetchRequestWrapper from "../utils/fetch-utils";
import { User, UserFormData } from "../utils/types";


async function postLogin(formData: UserFormData) {
  return await fetchRequestWrapper<User>(Constants.BASE_API_URL + Constants.AUTH_LOGIN_ROUTE + "/", Constants.POST, JSON.stringify(formData));
}

export default function useLogin(onSuccess: () => void) {
  return useMutation({
    mutationFn: (formData: UserFormData) => postLogin(formData),
    onSuccess: onSuccess
  });
}