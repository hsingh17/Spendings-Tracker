import { Currency } from "../hooks/useCurrencies";
import { Nullable } from "./types";

const MoneyUtils = {
  formatMoney(
    amount: Nullable<number>,
    withCurrencySign: boolean = true
  ): string {
    if (!amount) {
      return "";
    }

    const ret = new Intl.NumberFormat(this.getUserLocale(), {
      style: "currency",
      currency: this.getUserCurrency(),
    }).format(amount);

    return withCurrencySign ? ret : ret.substring(1);
  },

  getUserLocale() {
    if (navigator.languages) {
      return navigator.languages[0];
    }

    return "en-US";
  },

  getUserCurrency(): string {
    const json = localStorage.getItem("preferredCurrency");
    if (!json) {
      return "USD";
    }

    const obj: Currency = JSON.parse(json);
    return obj ? obj.shortName : "USD";
  },
};

export default MoneyUtils;
