import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { POST, PUT, SPENDINGS_API_ROUTE } from "../utils/constants";
import fetchRequestWrapper from "../utils/fetch-utils";
import { Spending } from "../utils/types";

async function postOrPutSpendings(
  spendings: Array<Spending>,
  spendingDate: string,
  isCreate: boolean,
) {
  return await fetchRequestWrapper(
    `${SPENDINGS_API_ROUTE}/${spendingDate}`,
    isCreate ? POST : PUT,
    JSON.stringify(spendings),
  );
}

export default function useSaveSpendings(
  date: string,
  isCreate: boolean,
  onSuccess: () => void,
) {
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
}
