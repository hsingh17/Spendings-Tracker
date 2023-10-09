import { FC } from "react";
import { FormInputColumnsProps, SpendingFormInput } from "../utils/types";
import FormRow from "./FormRow";
import TableEmptyState from "./TableEmptyState";

const FormInputColumns: FC<FormInputColumnsProps> = ({
  spendings,
  parentHandleChange,
  parentHandleDeleteRow,
}) => {
  const countSpendingsToDisplay = (spendings: Array<SpendingFormInput>) =>
    spendings.filter((spending) => !spending.delete).length;

  if (!spendings || countSpendingsToDisplay(spendings) === 0) {
    return <TableEmptyState />;
  }

  return (
    <div className="w-full md:w-fit h-full overflow-x-scroll">
      <div className="grid gap-x-5 gap-y-5 grid-cols-2 p-10 w-[500px] md:w-full flex-grow-0 flex-shrink-0 basis-full">
        <div className="text-center font-semibold text-lg text-theme-cta col-span-1">
          Category
        </div>
        <div className="text-center font-semibold text-lg text-theme-cta col-span-1">
          Amount
        </div>

        {spendings.map((spending: SpendingFormInput, idx: number) => {
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
    </div>
  );
};

export default FormInputColumns;
