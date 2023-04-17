import { FC } from "react";
import { Spending, SpendingsFormRowProps } from "../utils/types";
import SpendingFormInput from "./SpendingsFormInput";

const SpendingFormRow: FC<SpendingsFormRowProps> = ({ idx, spending, parentHandleDeleteRow, parentHandleChange }) => {
  const handleChange = (e: React.ChangeEvent, labelText: string) => {
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

  if (spending.userId === null) { // Spending marked for deletion
    return <></>;
  }

  return (
    <>
      <br />
      <SpendingFormInput idx={ idx } labelText="Category" value={ spending.category } parentHandleChange={ handleChange }/>
      <SpendingFormInput idx={ idx } labelText="Amount" value={ spending.amount } parentHandleChange={ handleChange }/>
      <button onClick={ (e: React.FormEvent) => { 
        e.preventDefault();
        parentHandleDeleteRow(idx);
      }}>X</button>    
    </>
  );
};

export default SpendingFormRow;