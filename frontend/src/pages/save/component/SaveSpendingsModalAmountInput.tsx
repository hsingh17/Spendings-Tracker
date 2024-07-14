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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    setAmount(2);
  };

  return (
    <>
      <label className="font-semibold text-slate-500">Amount</label>
      <div className="flex flex-row w-full mt-2 ">
        <span className="py-1 px-5 flex flex-col justify-center items-center font-semibold text-lg rounded-s-xl bg-slate-300 bg-opacity-80 shadow-2xl shadow-black">
          $
        </span>
        <input
          className="w-full text-right rounded-r-md p-2 border-slate-300 border-2 border-opacity-50 outline-none focus:border-slate-500"
          type="text"
          id={name}
          name={name}
          value={MoneyUtils.formatMoney(amount, CurrencyType.USD, false)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
        />
      </div>
    </>
  );
};

export default SaveSpendingsModalAmountInput;
