import { FC } from "react";
import { SpendingFormInput } from "../../../utils/types";

type SaveSpendingsModalFormProps = {
  spending: SpendingFormInput;
};

const SaveSpendingsModalAmountInput: FC<SaveSpendingsModalFormProps> = ({
  spending,
}) => {
  return (
    <>
      <label className="font-semibold text-slate-500">Amount</label>
      <input type="number" id="number" defaultValue={spending.amount || ""} />
    </>
  );
};

export default SaveSpendingsModalAmountInput;
