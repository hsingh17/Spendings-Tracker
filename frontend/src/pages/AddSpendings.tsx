import React, { useState } from "react";
import { Constants } from "../utils/constants";
import { SpendingFormRow } from "../utils/types";

const AddSpendings = () => {
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

    const apiUrl: string = Constants.BASE_URL + "/api/spending/create-spending";
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody),
      credentials: "include"
    });

    console.log(await response.text());
    // TODO
    if (response.ok) {
    } else {
    }
  }

  const handleChange = (e:React.ChangeEvent, idx: number) => {
    // Custom inline type
    const target = e.target as typeof e.target & {
      name: String,
      value: String
    };

    let newSpendings = [...spendings];
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

    let newSpendings = [...spendings];
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

  return (
    <>
      <h1>Add Spendings for the current date</h1>
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
        <input type="submit" value={ "Create new spending" }/>
      </form>
    </>
  );
};

export default AddSpendings;