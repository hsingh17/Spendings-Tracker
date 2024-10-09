import { useMutation } from "@tanstack/react-query";
import { Dayjs } from "dayjs";
import toast from "react-hot-toast";
import {
  DATE_ISO_FORMAT,
  POST,
  PUT,
  SPENDINGS_API_ROUTE,
} from "../utils/constants";
import fetchRequestWrapper from "../utils/fetch-utils";
import { Spending } from "../utils/types";

type SpendingSaveRequest = {
  spendingRequests: Spending[];
};

async function postOrPutSpendings(
  spendingSaveRequest: SpendingSaveRequest,
  spendingDate: Dayjs,
  isCreate: boolean,
) {
  return await fetchRequestWrapper(
    `${SPENDINGS_API_ROUTE}/${spendingDate.format(DATE_ISO_FORMAT)}`,
    isCreate ? POST : PUT,
    JSON.stringify(spendingSaveRequest),
  );
}

export default function useSaveSpendings(date: Dayjs, isCreate: boolean) {
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
  });
}
