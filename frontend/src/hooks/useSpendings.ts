import { useQuery } from "@tanstack/react-query";
import { Constants } from "../utils/constants";
import fetchRequestWrapper from "../utils/fetch-utils";
import { Nullable } from "../utils/types";

async function getSpendings<T>(searchParams: URLSearchParams) {
  let apiUrl: Nullable<string> = `${Constants.SPENDINGS_API_ROUTE}?${searchParams.toString()}`;
  return await fetchRequestWrapper<Array<T>>(apiUrl, Constants.GET);
}

export default function useSpendings<T>(searchParams: URLSearchParams) {
  return useQuery({
    queryKey: ["list-spendings", searchParams.toString()],
    queryFn: () => getSpendings<T>(searchParams)
  });
};
