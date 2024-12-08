import { useMutation } from "@tanstack/react-query";
import queryClient from "../config/QueryClientConfig";
import { PUT, UPDATE_CURRENCY_ROUTE } from "../utils/constants";
import fetchRequestWrapper from "../utils/fetch-utils";

type UpdateCurrencyRequest = {
  currency: string;
};

async function putUpdateCurrency(updateCurrencyRequest: UpdateCurrencyRequest) {
  return await fetchRequestWrapper(
    UPDATE_CURRENCY_ROUTE,
    PUT,
    JSON.stringify(updateCurrencyRequest)
  );
}

export default function useUpdateCurrency() {
  return useMutation({
    mutationFn: (updateCurrencyRequest: UpdateCurrencyRequest) =>
      putUpdateCurrency(updateCurrencyRequest),
    onSuccess: async () => {
      await queryClient.refetchQueries(["currencies"]);
      await queryClient.refetchQueries(["currency"]);
    },
  });
}
