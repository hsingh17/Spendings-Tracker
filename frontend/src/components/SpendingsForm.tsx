import React, { FC, useContext, useEffect, useState } from "react";
import { Nullable, Spending, SpendingsFormProps } from "../utils/types";
import SpendingFormRow from "./SpendingsFormRow";
import UserContext from "../contexts/UserContext";
import { Constants } from "../utils/constants";

const SpendingsForm: FC<SpendingsFormProps> = ({ parentHandleSubmit, parentSetDate, isAdd, date, initialSpendings }) => {
  const { user } = useContext(UserContext);
  const [ spendings, setSpendings ] = useState<Nullable<Array<Spending>>>(initialSpendings);

  useEffect(() => {
    setSpendings(initialSpendings);
  }, [initialSpendings]);

  const handleDateChange = (e: React.FormEvent) => {
    const target = e.target as typeof e.target & {
      value: string
    };
    parentSetDate(target.value);
  };

  const handleAddNewRow = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) { // TODO
      return;
    }

    let newSpendings: Array<Spending> = spendings ? [...spendings] : [];
    if (newSpendings.filter((spending) => spending.userId).length >= Constants.MAX_SPENDINGS_FOR_A_DAY) { // No more spendings allowed for the day
      return;
    }

    newSpendings.push({ spendingId: null, userId: user.userId, category: null, amount: null, date: date });
    setSpendings(newSpendings);
  };

  const handleDeleteRow = (idx: number) => {
    let newSpendings: Array<Spending> = spendings ? [...spendings] : [];
    
    if (newSpendings[idx].spendingId !== null) { // Need to "fake" delete this spending since this is in the database
      newSpendings[idx].userId = null;
    } else { // Completely new spending that can be safely removed
      newSpendings.splice(idx, 1);
    }

    setSpendings(newSpendings);
  };
  
  const handleChange = (idx: number, newSpending: Spending) => {
    if (!spendings) {
      return; // TODO:
    }

    let newSpendings: Array<Spending> = spendings ? [...spendings] : [];
    newSpendings[idx] = newSpending;
    setSpendings(newSpendings);
  };

  return (
    <form onSubmit={ _ => parentHandleSubmit(spendings) }>
      <label htmlFor="spending-date">Date:</label>
      <input type="date" id="spending-date" disabled={ !isAdd } defaultValue={ date || "" } onChange={ (e: React.ChangeEvent) => handleDateChange(e) }/>

      {
        spendings 
        ? spendings.map((spending: Spending, idx: number) => { 
          return <SpendingFormRow key={ idx } idx={ idx } spending={ spending } parentHandleDeleteRow={ handleDeleteRow } parentHandleChange={ handleChange } /> 
        })
        : <h2>NOTHING YET</h2> // TODO: Replace with something else
      }

      <br />      
      <button onClick={ (e: React.FormEvent) => handleAddNewRow(e) }>Add a new row</button>
      <input type="submit" value={ isAdd ? "Create new spending" : "Update spending" }/>
    </form>
  );
};

export default SpendingsForm;
