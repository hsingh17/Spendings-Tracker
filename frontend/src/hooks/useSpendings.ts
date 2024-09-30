import { useQuery } from "@tanstack/react-query";
import { GET, SPENDINGS_API_ROUTE } from "../utils/constants";
import fetchRequestWrapper from "../utils/fetch-utils";
import { ApiResponse, Nullable, SpendingsPage } from "../utils/types";

function mapStringDateToDateObj(response: ApiResponse<SpendingsPage>) {
  const contents = response.data?.spendingPage.content;
  if (!contents) {
    return response;
  }

  for (const content of contents) {
    content.date = new Date(content.date);
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
