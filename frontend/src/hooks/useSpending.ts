import { useQuery } from "@tanstack/react-query";
import fetchRequestWrapper from "../utils/fetch-utils";
import { Spending } from "../utils/types";
import { Constants } from "../utils/constants";

async function getSpending(spendingDate: string) {
  return await fetchRequestWrapper<Array<Spending>>(
    `${Constants.SPENDINGS_API_ROUTE}/${spendingDate}`, 
    Constants.GET);
}

export default function useSpending(spendingDate: string) {
  return useQuery({
    queryKey: ["spending", spendingDate],
    queryFn: () => getSpending(spendingDate)
  });
};