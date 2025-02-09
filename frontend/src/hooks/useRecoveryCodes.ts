import { useQuery } from "@tanstack/react-query";
import { GET, GET_RECOVERY_CODES_ROUTE } from "../utils/constants";
import fetchRequestWrapper from "../utils/fetch-utils";

export type RecoveryCodes = {
  recoveryCodes: string[];
};

async function getRecoveryCodes() {
  return await fetchRequestWrapper<RecoveryCodes>(
    GET_RECOVERY_CODES_ROUTE,
    GET,
  );
}

export default function useRecoveryCodes() {
  return useQuery({
    queryKey: ["recovery-codes"],
    queryFn: () => getRecoveryCodes(),
  });
}
