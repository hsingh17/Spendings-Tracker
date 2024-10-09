import { useQuery } from "@tanstack/react-query";
import CustomDayJs from "../config/DayJsConfig";
import {
  DATE_ISO_FORMAT,
  GET,
  SPENDING_CATEGORIES_ROUTE,
} from "../utils/constants";
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
    queryKey: ["spending-categories", CustomDayJs().format(DATE_ISO_FORMAT)],
    queryFn: () => getSpendingCategories(),
  });
}
