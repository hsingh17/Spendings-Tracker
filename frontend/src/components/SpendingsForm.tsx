import { FC, useContext, useState } from "react";
import { Nullable, Spending, SpendingsFormProps } from "../utils/types";
import SpendingFormRow from "./SpendingsFormRow";
import UserContext from "../contexts/UserContext";

const SpendingsForm: FC<SpendingsFormProps> = ({ parentSetSpendings, parentSetDate, isAdd, date, initialSpendings }) => {
  const { user } = useContext(UserContext);
  const [ spendings, setSpendings ] = useState<Nullable<Array<Spending>>>(initialSpendings);

  const handleDateChange = (e: React.FormEvent) => {
    const target = e.target as typeof e.target & {
      value: string
    };
    parentSetDate(target.value);
  };

  const handleAddNewRow = () => {
    if (!user) { // TODO
      return;
    }

    const newSpendings: Array<Spending> = spendings || [];
    newSpendings.push({ spendingId: null, userId: user.userId, category: null, amount: null, date: date });
    setSpendings(newSpendings);
  };

  return (
    <form onSubmit={ (e:React.FormEvent) => { handleSubmit(e) } }>
      <label htmlFor="spending-date">Date:</label>
      <input type="date" id="spending-date" disabled={ !isAdd } defaultValue={ date || "" } onChange={ (e: React.ChangeEvent) => { handleDateChange(e) } }/>

      {
        spendings 
        ? spendings.filter((spending: Spending) => spending.userId).map((spending: Spending, idx: number) => <SpendingFormRow key={ idx } /> ) 
        : <h2>NOTHING YET</h2> // TODO: Replace with something else
      }
      
      <button onClick={ (e:React.MouseEvent) => handleAddNewRow() }>Add a new row</button>
      <input type="submit" value={ isAdd ? "Create new spending" : "Update spending" }/>
    </form>
  );
};

export default SpendingsForm;
