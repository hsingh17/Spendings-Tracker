import { useEffect } from "react";
import useCurrency from "../hooks/useCurrency";

const PreferredCurrencyLoader = () => {
  const { data: response } = useCurrency();

  useEffect(() => {
    localStorage.setItem("preferredCurrency", JSON.stringify(response?.data));
  }, [response]);

  return null;
};

export default PreferredCurrencyLoader;
