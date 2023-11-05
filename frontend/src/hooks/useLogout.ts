import { useMutation } from "@tanstack/react-query";
import { Constants } from "../utils/constants";
import fetchRequestWrapper from "../utils/fetch-utils";

async function postLogout() {
  return await fetchRequestWrapper(
    Constants.AUTH_LOGOUT_ROUTE,
    Constants.POST);
}

export default function useLogout(onSuccess: () => void, onError: () => void) {
  return useMutation({
    mutationFn: () => postLogout(),
    onSuccess: onSuccess,
    onError: onError
  });
}