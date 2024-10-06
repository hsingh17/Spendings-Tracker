import { useQuery } from "@tanstack/react-query";
import { Dayjs } from "dayjs";
import { DATE_ISO_FORMAT, GET, SPENDINGS_API_ROUTE } from "../utils/constants";
import fetchRequestWrapper from "../utils/fetch-utils";
import { Spending } from "../utils/types";

export type SpendingDetailResponse = {
  spendings: Spending[];
};

async function getSpending(spendingDate: Dayjs) {
  return await fetchRequestWrapper<SpendingDetailResponse>(
    `${SPENDINGS_API_ROUTE}/${spendingDate.utc().format(DATE_ISO_FORMAT)}`,
    GET,
  );
}

export default function useSpending(spendingDate: Dayjs) {
  return useQuery({
    queryKey: ["spending", spendingDate],
    queryFn: () => getSpending(spendingDate),
  });
}
