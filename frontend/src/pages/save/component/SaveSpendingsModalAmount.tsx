import { FC, useEffect, useState } from "react";
import GenericInputFieldError from "../../../common/form/GenericInputFieldError";
import useFormValidate from "../../../hooks/useFormValidate";
import {
  FormValidator,
  GenericFormInputProps,
  SpendingFormInput,
} from "../../../utils/types";
import SaveSpendingsModalAmountInput from "./SaveSpendingsModalAmountInput";

type SaveSpendingsModalFormProps = GenericFormInputProps & {
  spending: SpendingFormInput;
};

const AMOUNT_VALIDATORS: FormValidator[] = [
  {
    msg: "Amount can not be zero",
    validate: (amount: string): boolean => Number.parseFloat(amount) > 0,
  },
];

const SaveSpendingsModalAmount: FC<SaveSpendingsModalFormProps> = ({
  name = "amount",
  addformvalidators: addFormValidators,
  spending,
}) => {
  const [amount, setAmount] = useState<number>(spending.amount || 0);
  const { setVal, errs } = useFormValidate(
    name,
    AMOUNT_VALIDATORS,
    addFormValidators,
  );
  const hasInputError = errs.length > 0 && !errs[0].valid;

  const setAmountWrapper = (newAmount: number) => {
    setAmount(newAmount);
    setVal(newAmount.toPrecision(2));
  };

  useEffect(() => {
    setVal(spending.amount?.toPrecision(2) || "");
  }, [spending]);

  return (
    <>
      <SaveSpendingsModalAmountInput
        name={name}
        amount={amount}
        hasInputError={hasInputError}
        setAmount={setAmountWrapper}
      />
      <GenericInputFieldError err={errs[0]} asListElement={false} />
    </>
  );
};

export default SaveSpendingsModalAmount;
