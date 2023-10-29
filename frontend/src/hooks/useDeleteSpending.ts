import { useMutation } from "@tanstack/react-query";
import { Constants } from "../utils/constants";
import fetchRequestWrapper from "../utils/fetch-utils";
import toast from "react-hot-toast";

async function deleteSpending(spendingId: number) {
  return await fetchRequestWrapper(
    `${Constants.BASE_API_URL + Constants.SPENDINGS_API_ROUTE}/${spendingId}`,
    Constants.DELETE
  );
}

export default function useDeleteSpending(onSuccess: () => void) {
  return useMutation({
    mutationFn: (spendingId: number) => {
      const promise = deleteSpending(spendingId);
      toast.promise(promise, {
        loading: "Deleting spending...",
        error: "Could not delete spending!",
        success: "Deleted spending!",
      });
      
      return promise;
    },
    onSuccess: onSuccess
  });
}