import React, { FC } from "react";
import { ReactComponent as DeleteRowIcon } from "../../../assets/raw/delete-icon.svg";
import { ReactComponent as WarningIcon } from "../../../assets/raw/warning-icon.svg";
import { SpendingFormInput } from "../../../utils/types";

const MAX_CHAR = 11;

export type FormRowProps = {
  idx: number;
  spending: SpendingFormInput;
  parentHandleDeleteRow: (idx: number) => void;
  parentHandleChange: (idx: number, newSpending: SpendingFormInput) => void;
};

const FormRow: FC<FormRowProps> = ({
  idx,
  spending,
  parentHandleDeleteRow,
  parentHandleChange,
}) => {
  const handleCategoryChange = (e: React.ChangeEvent) => {
    e.preventDefault();

    const changedSpending: SpendingFormInput = { ...spending };
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

    const changedSpending: SpendingFormInput = { ...spending };
    const charArr: string[] = target.value.split("");

    if (!charArr || charArr.length === 0) {
      changedSpending.amount = 0;
      parentHandleChange(idx, changedSpending);
      return;
    }

    charArr.splice(charArr.indexOf("."), 1); // Remove the old "."
    charArr.splice(charArr.length - 2, 0, "."); // Add the new "."
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
  };

  if (spending.delete) {
    // SpendingFormInput marked for deletion
    return <></>;
  }

  return (
    <>
      <div className="col-span-1 w-fit h-fit relative mb-10">
        <input
          className={`border-2 rounded-lg px-2 py-1 ${
            spending.categoryError ? "border-red-600" : "border-slate-300"
          }`}
          type="text"
          onChange={(e: React.ChangeEvent) => handleCategoryChange(e)}
          value={spending.category ? spending.category : ""}
        />
        {spending.categoryError ? (
          <span className="absolute top-full left-0 text-red-600 text-sm font-semibold flex flex-row items-center mt-1">
            <WarningIcon className="w-5 h-5 scale-125" />
            <p className="ml-1">{spending.categoryError}</p>
          </span>
        ) : (
          <></>
        )}
      </div>

      <div className="col-span-1 relative w-fit h-fit">
        <input
          className={`border-2 rounded-lg px-2 py-1 ${
            spending.amountError ? "border-red-600" : "border-slate-300"
          }`}
          type="text"
          onChange={(e: React.FormEvent) => handleChangeAmount(e)}
          onKeyDown={(e: React.KeyboardEvent) => checkValidKey(e)}
          value={
            spending.amount !== null && spending.amount !== undefined
              ? spending.amount.toFixed(2)
              : "0.00"
          }
        />
        {spending.amountError ? (
          <span className="absolute top-full left-0 text-red-600 text-sm font-semibold flex flex-row items-center mt-1">
            <WarningIcon className="w-5 h-5 scale-125" />
            <p className="ml-1">{spending.amountError}</p>
          </span>
        ) : (
          <></>
        )}

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
