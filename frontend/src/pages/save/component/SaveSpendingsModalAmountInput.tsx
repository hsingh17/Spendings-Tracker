import React, { FC } from "react";
import { MAX_AMOUNT } from "../../../utils/constants";
import MoneyUtils from "../../../utils/money-utils";

type SaveSpendingsModalAmountInputProps = {
  name: string;
  amount: number;
  hasInputError: boolean;
  setAmount: (amount: number) => void;
};

function calculateNewAmount(amountStr: string, key: string): number {
  const amountStrArr = amountStr.split(".");
  let newAmountStr = "";
  if (key === "Backspace") {
    newAmountStr =
      amountStrArr[0].substring(0, amountStrArr[0].length - 1) +
      "." +
      amountStr[0][amountStr[0].length - 1] +
      amountStrArr[1];
  } else {
    newAmountStr =
      amountStrArr[0] + amountStrArr[1][0] + "." + amountStrArr[1].substring(1);
  }

  return Number.parseFloat(newAmountStr);
}

const SaveSpendingsModalAmountInput: FC<SaveSpendingsModalAmountInputProps> = ({
  name,
  amount,
  hasInputError,
  setAmount,
}) => {
  const handleChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Backspace" && Number.isNaN(Number.parseInt(e.key))) {
      return;
    }

    let amountStr = amount.toFixed(2);
    if (e.key === "Backspace" && amount) {
      amountStr = amountStr.substring(0, amountStr.length - 1);
    } else if (e.key !== "Backspace") {
      amountStr += e.key;
    }

    if (amountStr.length < 3) {
      setAmount(0);
      return;
    }

    const newAmount = calculateNewAmount(amountStr, e.key);
    if (newAmount >= MAX_AMOUNT) {
      return;
    }

    setAmount(newAmount);
  };

  return (
    <>
      <label className="font-semibold text-slate-500">Amount</label>
      <div
        className={`flex flex-row w-full mt-2 ${hasInputError ? "border-red-500 rounded-xl p-[1px] border-2" : ""}`}
      >
        <span className="py-1 px-5 flex flex-col justify-center items-center font-semibold text-lg rounded-s-xl bg-slate-300 bg-opacity-80 drop-shadow-xl">
          $
        </span>
        <input
          className="w-full text-right rounded-r-md p-2 border-slate-300 border-2 border-opacity-50 outline-none focus:border-slate-500"
          type="text"
          id={name}
          name={name}
          value={MoneyUtils.formatMoney(amount, false)}
          readOnly
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            handleChange(e)
          }
        />
      </div>
    </>
  );
};

export default SaveSpendingsModalAmountInput;
