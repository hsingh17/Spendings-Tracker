import { useMutation } from "@tanstack/react-query";
import { Constants } from "../utils/constants";
import fetchRequestWrapper from "../utils/fetch-utils";

async function deleteSpending(spendingId: number) {
  return await fetchRequestWrapper(
    `${Constants.BASE_API_URL + Constants.SPENDINGS_API_ROUTE}/${spendingId}`,
    Constants.DELETE
  );
}

export default function useDeleteSpending(onSuccess: () => void) {
  return useMutation({
    mutationFn: (spendingId: number) => deleteSpending(spendingId),
    onSuccess: onSuccess
  });
}