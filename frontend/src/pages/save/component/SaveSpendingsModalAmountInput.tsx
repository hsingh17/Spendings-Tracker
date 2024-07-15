import React, { FC, useState } from "react";
import MoneyUtils, { CurrencyType } from "../../../utils/money-utils";
import { GenericFormInputProps, SpendingFormInput } from "../../../utils/types";

type SaveSpendingsModalFormProps = GenericFormInputProps & {
  spending: SpendingFormInput;
};

// const AMOUNT_VALIDATORS: FormValidator[] = [];

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

    let amountStr = amount.toString();
    if (e.key === "Backspace" && amount) {
      amountStr = amountStr.substring(0, amountStr.length - 1);
    } else {
      amountStr += e.key;
    }

    setAmount(Number.parseInt(amountStr));
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
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            handleChange(e)
          }
        />
      </div>
    </>
  );
};

export default SaveSpendingsModalAmountInput;
