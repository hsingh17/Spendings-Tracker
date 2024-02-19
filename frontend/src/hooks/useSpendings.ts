import { useQuery } from "@tanstack/react-query";
import { GET, SPENDINGS_API_ROUTE } from "../utils/constants";
import fetchRequestWrapper from "../utils/fetch-utils";
import { Nullable } from "../utils/types";

async function getSpendings<T>(searchParams: URLSearchParams) {
  const apiUrl: Nullable<string> = `${SPENDINGS_API_ROUTE}?${searchParams.toString()}`;
  return await fetchRequestWrapper<Array<T>>(apiUrl, GET);
}

export default function useSpendings<T>(searchParams: URLSearchParams) {
  return useQuery({
    queryKey: ["list-spendings", searchParams.toString()],
    queryFn: () => getSpendings<T>(searchParams),
  });
}
