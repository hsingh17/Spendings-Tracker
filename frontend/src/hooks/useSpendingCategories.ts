import { useQuery } from "@tanstack/react-query";
import { GET, SPENDING_CATEGORIES_ROUTE } from "../utils/constants";
import DateUtils from "../utils/date-utils";
import fetchRequestWrapper from "../utils/fetch-utils";
import { SpendingCategoriesResponse } from "../utils/types";

async function getSpendingCategories() {
  return await fetchRequestWrapper<SpendingCategoriesResponse>(
    SPENDING_CATEGORIES_ROUTE,
    GET,
  );
}

export default function useSpendingCategories() {
  return useQuery({
    // Use current day as query key so we don't keep calling route
    queryKey: ["spending-categories", DateUtils.getCurrentDate()],
    queryFn: () => getSpendingCategories(),
  });
}
