import { useQuery } from "@tanstack/react-query";
import { Constants } from "../utils/constants";
import { Nullable, SpendingListRow } from "../utils/types";
import fetchRequestWrapper from "../utils/fetch-utils";

async function getSpendings<T>(searchParams: URLSearchParams) {
  let apiUrl: Nullable<string> = `${Constants.BASE_API_URL + Constants.SPENDINGS_API_ROUTE}?${searchParams.toString()}`;
  return await fetchRequestWrapper<Array<T>>(apiUrl, Constants.GET);
}

export default function useSpendings<T>(searchParams: URLSearchParams) {
  return useQuery({
    queryKey: ["list-spendings", searchParams.toString()],
    queryFn: () => getSpendings<T>(searchParams)
  });
};
