import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { POST, PUT, SPENDINGS_API_ROUTE } from "../utils/constants";
import fetchRequestWrapper from "../utils/fetch-utils";
import { SpendingSaveRequest } from "../utils/types";

async function postOrPutSpendings(
  spendingSaveRequest: SpendingSaveRequest,
  spendingDate: string,
  isCreate: boolean,
) {
  return await fetchRequestWrapper(
    `${SPENDINGS_API_ROUTE}/${spendingDate}`,
    isCreate ? POST : PUT,
    JSON.stringify(spendingSaveRequest),
  );
}

export default function useSaveSpendings(
  date: string,
  isCreate: boolean,
  onSuccess: () => void,
) {
  return useMutation({
    mutationFn: (spendings: SpendingSaveRequest) => {
      const promise = postOrPutSpendings(spendings, date, isCreate);
      toast.promise(promise, {
        loading: `${isCreate ? "Creating" : "Updating"} spendings...`,
        error: `Unable to ${isCreate ? "create" : "update"} spendings!`,
        success: `${isCreate ? "Created" : "Updated"} spendings!`,
      });

      return promise;
    },
    onSuccess: onSuccess,
  });
}
