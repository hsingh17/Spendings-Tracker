import { useQuery } from "@tanstack/react-query";
import CustomDayJs from "../config/DayJsConfig";
import { GET, LIST_CURRENCIES_ROUTE } from "../utils/constants";
import fetchRequestWrapper from "../utils/fetch-utils";

export type Currency = {
  longName: string;
  shortName: string;
  symbol: string;
  flagImgUrl: string;
};

export type CurrenciesListResponse = {
  currencies: Currency[];
};

async function getCurrencies() {
  return await fetchRequestWrapper<CurrenciesListResponse>(
    LIST_CURRENCIES_ROUTE,
    GET,
  );
}

export default function useCurrencies() {
  return useQuery({
    queryKey: ["currencies", CustomDayJs().format("L")],
    queryFn: () => getCurrencies(),
  });
}
