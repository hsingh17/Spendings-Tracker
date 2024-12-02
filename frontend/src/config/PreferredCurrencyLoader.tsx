import { FC, useEffect } from "react";
import useCurrency from "../hooks/useCurrency";
import { ApiResponse, Nullable, User } from "../utils/types";
type PreferredCurrencyLoaderProps = {
  userResponse: Nullable<ApiResponse<User>>;
};
const PreferredCurrencyLoader: FC<PreferredCurrencyLoaderProps> = ({
  userResponse,
}) => {
  const { data: response } = useCurrency();

  // TODO: Currently only runs when page refreshed
  useEffect(() => {
    if (response?.ok && response.data) {
      localStorage.setItem("preferredCurrency", JSON.stringify(response.data));
    }
  }, [userResponse]);
  return null;
};

export default PreferredCurrencyLoader;
