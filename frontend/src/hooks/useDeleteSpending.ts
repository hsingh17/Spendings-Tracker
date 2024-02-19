import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { DELETE, SPENDINGS_API_ROUTE } from "../utils/constants";
import fetchRequestWrapper from "../utils/fetch-utils";

async function deleteSpending(spendingId: number) {
  return await fetchRequestWrapper(
    `${SPENDINGS_API_ROUTE}/${spendingId}`,
    DELETE,
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
    onSuccess: onSuccess,
  });
}
