import { Nullable } from "./types";

export const enum CurrencyType {
  USD,
}

const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const MoneyUtils = {
  formatMoney(
    amount: Nullable<number>,
    currencyType: CurrencyType = CurrencyType.USD,
    withDollarSign: boolean = true,
  ): string {
    let ret: string;
    switch (currencyType) {
      case CurrencyType.USD:
        ret = !amount ? "$0.00" : usdFormatter.format(amount);
    }

    return withDollarSign ? ret : ret.substring(1);
  },
};

export default MoneyUtils;
