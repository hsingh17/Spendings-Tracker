import { FC } from "react";
import { FormInputColumnsProps, Spending } from "../utils/types";
import FormRow from "./FormRow";
import TableEmptyState from "./TableEmptyState";

const FormInputColumns: FC<FormInputColumnsProps> = ({
  spendings,
  parentHandleChange,
  parentHandleDeleteRow,
}) => {
  if (!spendings || spendings.length === 0) {
    return <TableEmptyState />;
  }

  return (
    <div className="grid gap-x-5 gap-y-5 grid-cols-3">
      <div className="text-center font-semibold text-lg text-theme-cta">Category</div>
      <div className="text-center font-semibold text-lg text-theme-cta">Amount</div>
      <div>&nbsp;</div>
      {spendings
        .map((spending: Spending, idx: number) => {
          return (
            <FormRow
              key={idx}
              idx={idx}
              spending={spending}
              parentHandleChange={parentHandleChange}
              parentHandleDeleteRow={parentHandleDeleteRow}
            />
          );
        })}
    </div>
  );
};

export default FormInputColumns;
