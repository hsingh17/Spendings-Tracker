import { useQuery } from "@tanstack/react-query";
import { GET, SETUP_MFA_ROUTE } from "../utils/constants";
import fetchRequestWrapper from "../utils/fetch-utils";

export type SetupMfaResponse = {
  qrCodeDataUri: string;
  secretString: string;
};

async function mfaSetup() {
  return await fetchRequestWrapper<SetupMfaResponse>(SETUP_MFA_ROUTE, GET);
}

export default function useMfaSetup() {
  return useQuery({
    queryKey: ["mfa-setup"],
    queryFn: () => mfaSetup(),
  });
}
