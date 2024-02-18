import { Nullable } from "./types";

const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const MoneyUtils = {
  formatMoneyUsd(amount: Nullable<number>): string {
    return !amount ? "" : usdFormatter.format(amount);
  },
};

export default MoneyUtils;
