import React, { FC } from "react";
import { ReactComponent as DeleteRowIcon } from "../assets/raw/delete-icon.svg";
import { FormRowProps, Spending } from "../utils/types";

const MAX_CHAR = 11;
 
const FormRow: FC<FormRowProps> = ({
  idx,
  spending,
  parentHandleDeleteRow,
  parentHandleChange,
}) => {
  const handleCategoryChange = (e: React.ChangeEvent) => {
    e.preventDefault();

    let changedSpending: Spending = { ...spending };
    const target = e.target as typeof e.target & {
      value: string;
    };

    changedSpending.category = target.value;
    parentHandleChange(idx, changedSpending);
  };

  const handleChangeAmount = (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      value: string;
    };

    let changedSpending: Spending = { ...spending };
    const charArr: Array<String> = target.value.split("");
    charArr.splice(charArr.indexOf("."), 1)    // Remove the old "."
    charArr.splice(charArr.length-2, 0, ".");  // Add the new "."
    const newAmount: number = parseFloat(charArr.join(""));

    if (newAmount.toString().length > MAX_CHAR) {
      return; 
    }

    changedSpending.amount = newAmount;
    parentHandleChange(idx, changedSpending);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    parentHandleDeleteRow(idx);
  };

  const checkValidKey = (e: React.KeyboardEvent) => {
    // Stop event from continuing if it's not a number and a backspace
    if (e.key !== "Backspace" && isNaN(parseInt(e.key))) { 
      e.preventDefault();
    }
  }

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
          onChange={(e: React.ChangeEvent) => handleCategoryChange(e)}
          value={spending.category ? spending.category : ""}
        />
      </div>

      <div className="col-span-1 relative w-fit">
        <input
          className="border-2 border-slate-300 rounded-lg px-2 py-1"
          type="text"
          onChange={(e: React.FormEvent) => handleChangeAmount(e)}
          onKeyDown={(e: React.KeyboardEvent) => checkValidKey(e)}
          value={spending.amount !== null && spending.amount !== undefined ? spending.amount.toFixed(2) : "0.00"}
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
