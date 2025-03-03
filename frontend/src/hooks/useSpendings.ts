import { useQuery } from "@tanstack/react-query";
import CustomDayJs from "../config/DayJsConfig";
import { GET, SPENDINGS_API_ROUTE } from "../utils/constants";
import fetchRequestWrapper from "../utils/fetch-utils";
import {
  ApiResponse,
  Nullable,
  SpendingListRowBarChart,
  SpendingListRowLineChart,
  SpendingListRowPieChart,
  SpendingsPage,
} from "../utils/types";

function containsDate(
  content:
    | SpendingListRowLineChart
    | SpendingListRowBarChart
    | SpendingListRowPieChart,
): boolean {
  return (
    "date" in content && content.date !== undefined && content.date !== null
  );
}

function mapStringDateToDateObj(response: ApiResponse<SpendingsPage>) {
  const contents = response.data?.spendingPage.content;
  if (!contents) {
    return response;
  }

  for (const content of contents) {
    if (containsDate(content)) {
      // @ts-expect-error method containsDate will check if "date" property exists for content
      content.date = CustomDayJs(content.date);
    }
  }

  return response;
}

async function getSpendings(searchParams: URLSearchParams) {
  const apiUrl: Nullable<string> = `${SPENDINGS_API_ROUTE}?${searchParams.toString()}`;
  return mapStringDateToDateObj(
    await fetchRequestWrapper<SpendingsPage>(apiUrl, GET),
  );
}

export default function useSpendings(searchParams: URLSearchParams) {
  return useQuery({
    queryKey: ["list-spendings", searchParams.toString()],
    queryFn: () => getSpendings(searchParams),
  });
}
