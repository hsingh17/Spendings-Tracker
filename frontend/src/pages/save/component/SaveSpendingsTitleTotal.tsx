import { FC, useEffect, useState } from "react";
import MoneyUtils from "../../../utils/money-utils";
import { Spending } from "../../../utils/types";

type SaveSpendingsTitleTotalProps = { spendings: Spending[] };

const SaveSpendingsTitleTotal: FC<SaveSpendingsTitleTotalProps> = ({
  spendings,
}) => {
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    let sum = 0;
    for (const spending of spendings) {
      if (spending.delete) {
        continue;
      }

      sum += spending.amount || 0;
    }

    setTotal(sum);
  }, [spendings]);

  return (
    <h1 className="text-theme-cta font-semibold text-4xl md:text-6xl">
      {MoneyUtils.formatMoney(total)}
    </h1>
  );
};

export default SaveSpendingsTitleTotal;
