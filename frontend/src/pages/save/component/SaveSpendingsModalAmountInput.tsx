import React, { FC, useState } from "react";
import MoneyUtils, { CurrencyType } from "../../../utils/money-utils";
import { GenericFormInputProps, SpendingFormInput } from "../../../utils/types";

type SaveSpendingsModalFormProps = GenericFormInputProps & {
  spending: SpendingFormInput;
};

// const AMOUNT_VALIDATORS: FormValidator[] = [];

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

const SaveSpendingsModalAmountInput: FC<SaveSpendingsModalFormProps> = ({
  name = "amount",
  // addformvalidators: addFormValidators,
  spending,
}) => {
  const [amount, setAmount] = useState<number>(spending.amount || 0);
  // const { setVal, errs } = useFormValidate(
  //   name,
  //   getValidators(categoriesMap),
  //   addFormValidators
  // );

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

    setAmount(calculateNewAmount(amountStr, e.key));
  };

  return (
    <>
      <label className="font-semibold text-slate-500">Amount</label>
      <div className="flex flex-row w-full mt-2 ">
        <span className="py-1 px-5 flex flex-col justify-center items-center font-semibold text-lg rounded-s-xl bg-slate-300 bg-opacity-80 drop-shadow-xl">
          $
        </span>
        <input
          className="w-full text-right rounded-r-md p-2 border-slate-300 border-2 border-opacity-50 outline-none focus:border-slate-500"
          type="text"
          id={name}
          name={name}
          value={MoneyUtils.formatMoney(amount, CurrencyType.USD, false)}
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
