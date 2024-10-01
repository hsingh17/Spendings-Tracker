import { useQuery } from "@tanstack/react-query";
import { GET, SPENDING_CATEGORIES_ROUTE } from "../utils/constants";
import DateUtils from "../utils/date-utils";
import fetchRequestWrapper from "../utils/fetch-utils";
import { CategoriesMap } from "../utils/types";

type SpendingCategoriesResponse = {
  categoryToS3UrlMap: CategoriesMap;
};

async function getSpendingCategories() {
  return await fetchRequestWrapper<SpendingCategoriesResponse>(
    SPENDING_CATEGORIES_ROUTE,
    GET,
  );
}

export default function useSpendingCategories() {
  return useQuery({
    // Use current day as query key so we don't keep calling route
    queryKey: ["spending-categories", DateUtils.getCurrentDateAsRFC3339()],
    queryFn: () => getSpendingCategories(),
  });
}
