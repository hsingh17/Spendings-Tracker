import { useQuery } from "@tanstack/react-query";
import CustomDayJs from "../config/DayJsConfig";
import { GET, GET_CURRENCY_ROUTE } from "../utils/constants";
import fetchRequestWrapper from "../utils/fetch-utils";
import { Currency } from "./useCurrencies";

async function getCurrency() {
  return await fetchRequestWrapper<Currency>(GET_CURRENCY_ROUTE, GET);
}

export default function useCurrency() {
  return useQuery({
    queryKey: ["currency", CustomDayJs().format("L")],
    queryFn: () => getCurrency(),
  });
}
