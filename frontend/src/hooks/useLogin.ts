import { useMutation } from "@tanstack/react-query";
import fetchRequestWrapper from "../utils/fetch-utils";
import { User, UserFormData } from "../utils/types";
import { Constants } from "../utils/constants";
import { useNavigate } from "react-router-dom";


async function postLogin(formData: UserFormData) {
  return await fetchRequestWrapper<User>(Constants.BASE_API_URL + Constants.AUTH_LOGIN_ROUTE + "/", Constants.POST, JSON.stringify(formData));
}

export default function useLogin() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (formData: UserFormData) => postLogin(formData),
    onSuccess: () => navigate(Constants.DASHBOARD_PAGE)
  });
}