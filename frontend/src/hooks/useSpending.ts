import { useQuery } from "@tanstack/react-query";
import { GET, SPENDINGS_API_ROUTE } from "../utils/constants";
import fetchRequestWrapper from "../utils/fetch-utils";
import { Spending } from "../utils/types";

type SpendingDetailResponse = {
  spendings: Spending[];
};

async function getSpending(spendingDate: string) {
  return await fetchRequestWrapper<SpendingDetailResponse>(
    `${SPENDINGS_API_ROUTE}/${spendingDate}`,
    GET,
  );
}

export default function useSpending(spendingDate: string) {
  return useQuery({
    queryKey: ["spending", spendingDate],
    queryFn: () => getSpending(spendingDate),
  });
}
