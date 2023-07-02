import React, { FC, useEffect, useState } from "react";
import { Nullable, Spending, SaveSpendingsFormProps } from "../utils/types";
import SpendingFormRow from "./SpendingsFormRow";
import { Constants } from "../utils/constants";
import useSaveSpendings from "../hooks/useSaveSpendings";

const SaveSpendingsForm: FC<SaveSpendingsFormProps> = ({ parentHandleDateChange, date, initialSpendings }) => {
  const isNewSpendings: boolean = initialSpendings === null || initialSpendings === undefined;
  const [spendings, setSpendings] = useState<Array<Spending>>(initialSpendings ? initialSpendings : []);
  const {mutate} = useSaveSpendings(date, isNewSpendings);

  useEffect(() => {
    setSpendings(initialSpendings ? initialSpendings : []);
  }, [initialSpendings]);

  const countSpendingsToDisplay = () => spendings.filter(spending => !spending.delete).length;

  const handleDateChange = (e: React.FormEvent) => {
    const target = e.target as typeof e.target & {
      value: string
    };

    parentHandleDateChange(target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Input validation
    mutate(spendings);
  };

  const handleAddNewRow = (e: React.FormEvent) => {
    e.preventDefault();

    if (countSpendingsToDisplay() >= Constants.MAX_SPENDINGS_FOR_A_DAY) { // No more spendings allowed for the day
      return;
    }

    let newSpendings: Array<Spending> = [...spendings];
    newSpendings.push({ spendingId: null, category: null, amount: null, delete: false });
    setSpendings(newSpendings);
  };

  const handleDeleteRow = (idx: number) => {
    let newSpendings: Array<Spending> = [...spendings];
    
    if (newSpendings[idx].spendingId !== null) { 
      newSpendings[idx].delete = true;
    } else { // Completely new spending that can be safely removed
      newSpendings.splice(idx, 1);
    }

    setSpendings(newSpendings);
  };
  
  const handleChange = (idx: number, newSpending: Spending) => {
    let newSpendings: Array<Spending> = [...spendings];
    newSpendings[idx] = newSpending;
    setSpendings(newSpendings);
  };

  return (
    <form onSubmit={(e: React.FormEvent) => handleSubmit(e)}>
      <label htmlFor="spending-date">Date:</label>
      <input 
        type="date" 
        id="spending-date" 
        defaultValue={date} 
        onChange={(e: React.ChangeEvent) => handleDateChange(e)}/>

      {
        countSpendingsToDisplay() 
        ? spendings.map((spending: Spending, idx: number) => { 
          return <SpendingFormRow 
                    key={idx} 
                    idx={idx} 
                    spending={spending} 
                    parentHandleDeleteRow={handleDeleteRow} 
                    parentHandleChange={handleChange} 
                  /> 
        })
        : <h2>NOTHING YET</h2> // TODO: Replace with something else
      }

      <br />      
      <button onClick={ (e: React.FormEvent) => handleAddNewRow(e) }>Add a new row</button>
      <input type="submit" value={isNewSpendings ? "Create new spending(s)" : "Update spending"}/>
    </form>
  );
};

export default SaveSpendingsForm;
