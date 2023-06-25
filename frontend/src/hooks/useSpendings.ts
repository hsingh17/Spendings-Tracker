import { useQuery } from "@tanstack/react-query";
import { Constants } from "../utils/constants";
import { Nullable, SpendingUserAggr } from "../utils/types";
import fetchRequestWrapper from "../utils/fetch-utils";

async function getSpendings(startDate: Nullable<string>, endDate: Nullable<string>, limit: Nullable<string>) {
    let apiUrl: Nullable<string> = `${Constants.BASE_API_URL + Constants.SPENDINGS_API_ROUTE}?`;
    apiUrl += "";

    return await fetchRequestWrapper<Array<SpendingUserAggr>>(Constants.BASE_API_URL + Constants.SPENDINGS_API_ROUTE,)
}

export default function useSpendings(searchParams: URLSearchParams) {
    const startDate: Nullable<string> = searchParams.get(Constants.FORM_START_DATE_KEY);
    const endDate: Nullable<string> = searchParams.get(Constants.FORM_START_DATE_KEY);
    const limit: Nullable<string> = searchParams.get(Constants.FORM_START_DATE_KEY);

    return useQuery({
        queryKey: ["spendings", startDate, endDate, limit],
        queryFn: () => getSpendings(startDate, endDate, limit)
    });
};
