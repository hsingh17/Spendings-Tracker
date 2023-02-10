import React, { useState, useEffect, useContext, FC } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { Constants } from "../utils/constants";
import { AddEditSpendingProps, Spending, SpendingFormRow, SpendingsApiResponse } from "../utils/types";
import isLoggedIn from "../utils/user-logged-in-helper";

const AddEditSpendings: FC<AddEditSpendingProps> = ({ isAdd, spendingDate }) => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [spendings, setSpendings] = useState<Array<SpendingFormRow>>([{
    category: null,
    amount: null
  }]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Cleanse and verify input
    
    let categories = new Array<String>();
    let amounts = new Array<Number>();

    spendings.forEach(spending => {
      let category: String = spending.category || ""; // TODO: figure out another way for this after input hasbeen cleansed and verified
      categories.push(category.toLocaleUpperCase());
      amounts.push(Number(spending.amount));
    });

    const requestBody = {
      categories: categories,
      amounts: amounts
    };

    const apiEndpoint: string = "/api/spending/" + (isAdd ? "create-spending" : `update-spending/${spendingDate}`);
    const apiUrl: string = Constants.BASE_URL + apiEndpoint;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody),
      credentials: "include"
    });

    if (response.ok) {
      navigate(-1); // Go back to previous page
    } else {
      // TODO: Maybe prompt user with a pop-up that something bad happened
      alert("Uh oh. We were unable to process that request. Please try again!")
    }
  }

  const handleChange = (e:React.ChangeEvent, idx: number) => {
    // Custom inline type
    const target = e.target as typeof e.target & {
      name: string,
      value: string
    };

    let newSpendings: Array<SpendingFormRow> = [...spendings];
    if (target.name === "category") {
      newSpendings[idx].category = target.value;
    } else {
      newSpendings[idx].amount = target.value;
    }
    setSpendings(newSpendings);
  }

  const handleDeleteRow = (e: React.MouseEvent, idx: number) => {
    e.preventDefault();
    if (spendings.length === 1) {
      return;
    }

    let newSpendings: Array<SpendingFormRow> = [...spendings];
    newSpendings.splice(idx, 1);
    setSpendings(newSpendings);
  }

  const handleAddNewRow = (e: React.MouseEvent) => {
    e.preventDefault();
    setSpendings([...spendings, {
      amount: null,
      category: null,
    }]);
  }


  useEffect(() => {
    const getSpending = async () => {
      const apiUrl: string = Constants.BASE_URL + `/api/spending/get-spending?start-date=${spendingDate}&end-date=${spendingDate}`;
      
      const response = await fetch(apiUrl, {
        method: "GET",
        credentials: "include"
      });

      const body: SpendingsApiResponse = await response.json() as SpendingsApiResponse;
      let spendingsArray: Array<Spending> = body.spendings[spendingDate as string];
      let spendings: Array<SpendingFormRow> = [];

      spendingsArray.forEach((spending => {
        spendings.push({
          amount: spending.amount.toString(),
          category: spending.category as string
        });
      }));

      setSpendings(spendings);      
    }

    isLoggedIn(user, setUser, navigate, null, "/login");
    if (!isAdd) {
      getSpending();
    }
  }, []);

  return (
    <>
      <h1>{ isAdd ? "Add Spendings for the current date" : `Update spending for date: ${spendingDate}` }</h1>

      <form onSubmit={ (e:React.FormEvent) => { handleSubmit(e) } }>
        {
          spendings.map((spending: SpendingFormRow, idx: number) => {
            return (
              <div key={ idx } >
                <label>Category:</label>
                <input 
                  type="text" 
                  name="category" 
                  value={ spending.category || "" } 
                  onChange={ (e:React.ChangeEvent) => { handleChange(e, idx) }} />
                
                <label>Amount:</label>
                <input 
                  type="text" 
                  name="amount" 
                  value={ spending.amount || "" } 
                  onChange={ (e:React.ChangeEvent) => { handleChange(e, idx) }} />

                <button onClick={ (e:React.MouseEvent ) => { handleDeleteRow(e, idx) }}>X</button>
              </div>
            )
          })
        }

        <button onClick={ (e:React.MouseEvent ) => { handleAddNewRow(e) }}>Add a new row</button>
        <input type="submit" value={ isAdd ? "Create new spending" : "Update spending" }/>
      </form>
    </>
  );
};

export default AddEditSpendings;