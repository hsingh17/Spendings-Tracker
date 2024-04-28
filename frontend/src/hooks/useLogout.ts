import { useMutation } from "@tanstack/react-query";
import { AUTH_LOGOUT_ROUTE, POST } from "../utils/constants";
import fetchRequestWrapper from "../utils/fetch-utils";

async function postLogout() {
  return await fetchRequestWrapper(AUTH_LOGOUT_ROUTE, POST);
}

export default function useLogout(onSuccess: () => void, onError: () => void) {
  return useMutation({
    mutationFn: () => postLogout(),
    onSuccess: onSuccess,
    onError: onError,
  });
}
