import { useQuery } from "@tanstack/react-query";
import { GET, SPENDINGS_API_ROUTE } from "../utils/constants";
import fetchRequestWrapper from "../utils/fetch-utils";
import { Nullable, SpendingsPage } from "../utils/types";

async function getSpendings(searchParams: URLSearchParams) {
  const apiUrl: Nullable<string> = `${SPENDINGS_API_ROUTE}?${searchParams.toString()}`;
  return await fetchRequestWrapper<SpendingsPage>(apiUrl, GET);
}

export default function useSpendings(searchParams: URLSearchParams) {
  return useQuery({
    queryKey: ["list-spendings", searchParams.toString()],
    queryFn: () => getSpendings(searchParams),
  });
}
