import { FC, useState } from "react";
import useApi from "../hooks/useApi";
import { Constants } from "../utils/constants";
import { AddEditSpendingProps, Nullable, Spending, SpendingUserAggr } from "../utils/types";
import SpendingsForm from "./SpendingsForm";
import AddEditSpendingsNavigate from "./AddEditSpendingsNavigate";

const CURDATE = new Date().toISOString().split("T")[0];

const AddEditSpendings: FC<AddEditSpendingProps> = ({ isAdd, spendingDate }) => {
  const [ date, setDate ] = useState<string>(spendingDate || CURDATE);
  const { loading, response } = useApi<Array<SpendingUserAggr>>(Constants.BASE_API_URL + Constants.SPENDINGS_API_ROUTE + `?start-date=${date}&end-date=${date}`, Constants.GET);
  const [ submittedSpendings, setSubmittedSpendings ] = useState<Nullable<Array<Spending>>>(null); // These are the spendings from the form the user submits
  const [ error, setError ] = useState<Nullable<string>>(null);

  const parentHandleSubmit = (spendings: Nullable<Array<Spending>>) => setSubmittedSpendings(spendings);
  const parentSetDate = (date: string) => setDate(date);
  const parentSetError = (error: Nullable<string>) => setError(error);
   
  // TODO: Below error handling is temporary
  if (loading) {
    return <h1>Loading...</h1>;
  }  

  if (!response?.ok || !response.data) {
    return <h1>{response?.message}</h1>;
  }

  return (
  <>
      <h1>{ isAdd ? "Add Spendings for the current date" : "Update spending" }</h1>
      {
        !submittedSpendings 
        ? <SpendingsForm 
            parentHandleSubmit={ parentHandleSubmit } 
            parentSetDate={ parentSetDate } 
            isAdd={ isAdd } 
            date={ date } 
            initialSpendings={ (response.data !== null && response.data[0].spendings.length !== 0) ? response.data[0].spendings : [] } />
        : <AddEditSpendingsNavigate 
            spendingDate={ date }
            spendings={ submittedSpendings }
            parentSetSpendings={ parentHandleSubmit }
            parentSetError={ parentSetError }
          />
      }

      { error && <h1>{error}</h1> /* TODO */ } 
    </>
  );
};

export default AddEditSpendings;