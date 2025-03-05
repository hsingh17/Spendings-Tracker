import { useQuery } from "@tanstack/react-query";
import CustomDayJs from "../config/DayJsConfig";
import { GET, SPENDINGS_API_ROUTE } from "../utils/constants";
import fetchRequestWrapper from "../utils/fetch-utils";
import {
  ApiResponse,
  Nullable,
  SpendingListItem,
  SpendingsPage,
} from "../utils/types";

function containsDate<Type extends SpendingListItem>(content: Type): boolean {
  return (
    "date" in content && content.date !== undefined && content.date !== null
  );
}

function mapStringDateToDateObj<Type extends SpendingListItem>(
  response: ApiResponse<SpendingsPage<Type>>,
) {
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

async function getSpendings<Type extends SpendingListItem>(
  searchParams: URLSearchParams,
) {
  const apiUrl: Nullable<string> = `${SPENDINGS_API_ROUTE}?${searchParams.toString()}`;
  return mapStringDateToDateObj<Type>(
    await fetchRequestWrapper<SpendingsPage<Type>>(apiUrl, GET),
  );
}

export default function useSpendings<Type extends SpendingListItem>(
  searchParams: URLSearchParams,
) {
  return useQuery({
    queryKey: ["list-spendings", searchParams.toString()],
    queryFn: () => getSpendings<Type>(searchParams),
  });
}
