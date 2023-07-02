import { useQuery } from "@tanstack/react-query";
import { Constants } from "../utils/constants";
import { Nullable, SpendingListRow } from "../utils/types";
import fetchRequestWrapper from "../utils/fetch-utils";

async function getListSpendings(searchParams: URLSearchParams) {
  let apiUrl: Nullable<string> = `${Constants.BASE_API_URL + Constants.SPENDINGS_API_ROUTE}?${searchParams.toString()}`;
  return await fetchRequestWrapper<Array<SpendingListRow>>(apiUrl, Constants.GET);
}

export default function useListSpendings(searchParams: URLSearchParams) {
  return useQuery({
    queryKey: ["list-spendings", searchParams.toString()],
    queryFn: () => getListSpendings(searchParams)
  });
};
