import { useMutation } from "@tanstack/react-query";
import { Constants } from "../utils/constants";
import fetchRequestWrapper from "../utils/fetch-utils";
import { Spending } from "../utils/types";
import toast from "react-hot-toast";

async function postOrPutSpendings(spendings: Array<Spending>, spendingDate: string, isCreate: boolean) {
  return await fetchRequestWrapper(
    `${Constants.BASE_API_URL + Constants.SPENDINGS_API_ROUTE}/${spendingDate}`,
    isCreate ? Constants.POST : Constants.PUT,
    JSON.stringify(spendings)
  );
}

export default function useSaveSpendings(date: string, isCreate: boolean, onSuccess: () => void) {
  return useMutation({
    mutationFn: (spendings: Array<Spending>) => {
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
};
