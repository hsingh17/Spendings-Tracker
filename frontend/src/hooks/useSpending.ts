import { useQuery } from "@tanstack/react-query";
import { GET, SPENDINGS_API_ROUTE } from "../utils/constants";
import DateUtils from "../utils/date-utils";
import fetchRequestWrapper from "../utils/fetch-utils";
import { Spending } from "../utils/types";

export type SpendingDetailResponse = {
  spendings: Spending[];
};

async function getSpending(spendingDate: Date) {
  return await fetchRequestWrapper<SpendingDetailResponse>(
    `${SPENDINGS_API_ROUTE}/${DateUtils.getUTCDateAsRFC3339(spendingDate)}`,
    GET,
  );
}

export default function useSpending(spendingDate: Date) {
  return useQuery({
    queryKey: ["spending", spendingDate],
    queryFn: () => getSpending(spendingDate),
  });
}
