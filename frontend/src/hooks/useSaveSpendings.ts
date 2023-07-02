import { useMutation } from "@tanstack/react-query";
import { Spending } from "../utils/types";
import fetchRequestWrapper from "../utils/fetch-utils";
import { Constants } from "../utils/constants";

async function postOrPutSpendings(spendings: Array<Spending>, spendingDate: string, isCreate: boolean) {
  return await fetchRequestWrapper(
    `${Constants.BASE_API_URL + Constants.SPENDINGS_API_ROUTE}/${spendingDate}`, 
    isCreate ? Constants.POST : Constants.PUT,
    JSON.stringify(spendings)
  );
}

export default function useSaveSpendings(date: string, isCreate: boolean) {
  return useMutation({
    mutationFn: (spendings: Array<Spending>) => postOrPutSpendings(spendings, date, isCreate),
    onSuccess: _ => alert(`${isCreate ? "Created" : "Updated"} spendings for date ${date}`)
  });
};
