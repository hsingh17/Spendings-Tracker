import React, { FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { Constants } from "../utils/constants";
import fetchRequestWrapper from "../utils/fetch-wrapper";
import { AddEditSpendingProps, Nullable, Spending, SpendingsApiResponse, GenericApiResponse, SpendingsFormRow } from "../utils/types";
import isLoggedIn from "../utils/user-logged-in-helper";
import useApi from "../hooks/useApi";
import SpendingsForm from "./SpendingsForm";
/*

  const getActivelyDisplayedSpendings = () : number => {
    if (!spendings) {
      return 0;
    }

    // A spending is actively shown if it has a non null userId
    return spendings.filter((spending: SpendingsFormRow) => spending.userId !== null).length;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!spendings) {
      return;
    }

    // TODO: Cleanse and verify input

    const spendingsBody: Array<Spending> = spendings.map((spending: SpendingsFormRow) => {
      return {
        spendingId: spending.spendingId,
        userId: spending.userId,
        category: spending.category!.toLocaleUpperCase(), // TODO: maybe better way than asserting non null here (maybe once verified input)
        amount: parseFloat(spending.amount as string), // TODO: maybe better way than casting with as string (maybe once verified input)
        date: spending.date
      }
    });

    const apiUrl: string = Constants.BASE_API_URL + Constants.SAVE_SPENDING_API_ROUTE;
    const response = await fetchRequestWrapper<GenericApiResponse>(apiUrl, "POST", JSON.stringify(spendingsBody));

    if (response.ok) {
      // navigate(-1); // Go back to previous page
      alert("success!");
    } else {
      // TODO: Maybe prompt user with a pop-up that something bad happened
      alert("Uh oh. We were unable to process that request. Please try again!")
    }
  }

  const handleChange = (e:React.ChangeEvent, idx: number) => {
    if (!spendings) { // Spendings is null (shouldn't techincally ever happen)
      return;
    }

    // Custom inline type
    const target = e.target as typeof e.target & {
      name: string,
      value: string
    };

    let newSpendings: Array<SpendingsFormRow> = [...spendings];
    if (target.name === "category") {
      newSpendings[idx].category = target.value;
    } else {
      newSpendings[idx].amount = target.value;
    }
    
    setSpendings(newSpendings);
  }

  const handleDeleteRow = (e: React.MouseEvent, idx: number) => {
    e.preventDefault();
    if (!spendings) { // Spendings is null (shouldn't techincally ever happen)
      return;
    }

    let newSpendings: Array<SpendingsFormRow> = [...spendings];
    if (newSpendings[idx].spendingId) { // This spending has non-null spending ID, meaning that it is stored in the DB. Mark for deletion
      newSpendings[idx].userId = null;
    } else { // This spending has a null spending ID meaning it was just added now and it is not in backend. Can safely delete.
      newSpendings.splice(idx, 1); 
    }

    setSpendings(newSpendings);
  }

  const handleAddNewRow = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!spendings) {
      setSpendings([{
        spendingId: null,
        userId: user?.userId as number, // TODO:  
        category: null,
        amount: null,
        date: date // TODO: Check what a null spending date does in backend
      }]);
      return;
    }

    // +1 to account for the row we would be adding due to the call to handleAddNewRow
    if (getActivelyDisplayedSpendings()+1 > Constants.MAX_SPENDINGS_FOR_A_DAY) {
      alert("NO MORE SPENDINGS ALLOWED!!!");
      return;
    }


    setSpendings([...spendings, {
      spendingId: null,
      userId: user?.userId as number, // TODO:  
      category: null,
      amount: null,
      date: date
    }]);
  }
  
  const handleDateChange = (e: React.ChangeEvent) => {
    const target = e.target as typeof e.target & {
      value: string
    };

    const newDate:string = target.value;
    setDate(newDate);

    if (!spendings) {
      return;
    }

    // Change the dates for the spendings
    spendings.forEach((spending: SpendingsFormRow) => {
      spending.date = newDate;
    });
  }

  useEffect(() => {
    const getSpendings = async () => {
      const apiUrl: string = Constants.BASE_API_URL + `/api/spending/get-spending?start-date=${spendingDate}&end-date=${spendingDate}`;
      const response = await fetchRequestWrapper<SpendingsApiResponse>(apiUrl, "GET", "");  
      if (!response.ok || !response.obj) {
        // TODO:
        console.error(response.error);
        return;
      }

      let spendingsArray: Array<Spending> = response.obj.spendingsForADayList[0].spendings;
      let spendingsFormArray: Array<SpendingsFormRow> = [];

      spendingsArray.forEach((spending: Spending) => {
        spendingsFormArray.push({
          spendingId: spending.spendingId,
          userId: spending.userId,
          category: spending.category,
          amount: spending.amount ? spending.amount.toString() : null,
          date: spending.date
        })
      });

      setSpendings(spendingsFormArray);      
    }

    isLoggedIn(user, setUser, navigate, null, "/login");
    
    if (!isAdd) {
      getSpendings();
    } 

  }, []);
*/

const AddEditSpendings: FC<AddEditSpendingProps> = ({ isAdd, spendingDate }) => {
  const [ date, setDate ] = useState<Nullable<string>>(spendingDate);
  const { loading, response } = useApi<SpendingsApiResponse>(Constants.BASE_API_URL + Constants.GET_SPENDING_API_ROUTE + `start-date=${spendingDate}&end-date=${spendingDate}`, "GET");
  const [ spendings, setSpendings ] = useState<Nullable<Array<Spending>>>(null); // These are the spendings from the form the user submits

  const parentSetSpendings = (spendings: Nullable<Array<Spending>>) => setSpendings(spendings);
  const parentSetDate = (date: string) => setDate(date);
  
  // TODO: Below error handling is temporary
  if (loading) {
    return <h1>Loading...</h1>;
  }  

  if (!response || !response?.ok || !response.obj) {
    return <h1>{response?.error}</h1>;
  }

  return (
    <>
      <h1>{ isAdd ? "Add Spendings for the current date" : "Update spending" }</h1>
      {
        !spendings 
        ? <SpendingsForm 
            parentSetSpendings={ parentSetSpendings } 
            parentSetDate={ parentSetDate } 
            isAdd={ isAdd } 
            date={ date } 
            initialSpendings={ response.obj.spendingsForADayList[0].spendings } />
        : <h1>TODO</h1>
      }
    </>
  );
};

export default AddEditSpendings;