import React, { FC } from "react";
import { FormRowProps, Spending } from "../utils/types";
import { ReactComponent as DeleteRowIcon } from "../assets/delete-icon.svg";
const FormRow: FC<FormRowProps> = ({
  idx,
  spending,
  parentHandleDeleteRow,
  parentHandleChange,
}) => {
  const handleChange = (e: React.ChangeEvent, labelText: string) => {
    e.preventDefault();

    let changedSpending: Spending = { ...spending };
    const target = e.target as typeof e.target & {
      value: string;
    };

    if (labelText === "Category") {
      changedSpending.category = target.value;
    } else {
      changedSpending.amount = parseFloat(target.value); // TODO: possibly a better way and error handling
    }

    parentHandleChange(idx, changedSpending);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    parentHandleDeleteRow(idx);
  };

  if (spending.delete) {
    // Spending marked for deletion
    return <></>;
  }

  return (
    <>
      <div className="col-span-1 w-fit">
        <input
          className="border-2 border-slate-300 rounded-lg px-2 py-1"
          type="text"
          onChange={(e: React.ChangeEvent) => handleChange(e, "Category")}
          value={spending.category ? spending.category : ""}
        />
      </div>

      <div className="col-span-1 relative w-fit">
        <input
          className="border-2 border-slate-300 rounded-lg px-2 py-1"
          type="text"
          onChange={(e: React.ChangeEvent) => handleChange(e, "Spending")}
          value={spending.amount ? spending.amount.toString() : ""}
        />

        <button
          className="col-span-1 absolute -right-10 top-0.5 opacity-70 hover:opacity-100"
          onClick={(e: React.MouseEvent) => handleDelete(e)}
        >
          <DeleteRowIcon className="w-7 h-7" stroke="red" />
        </button>
      </div>
    </>
  );
};

export default FormRow;
