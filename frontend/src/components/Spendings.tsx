import { useEffect, useState } from "react";
import { Spending, SpendingsResponse } from "../utils/types";
import { Constants } from "../utils/constants";

const Spendings = () => {
  const [ responseObj, setResponseObj ] = useState<SpendingsResponse | null>(null);

  useEffect(() => {
    const getSpendings = async () => {
      const apiUrl: string = Constants.BASE_URL + "/api/spending/get-spending";
      const response = await fetch(apiUrl, {
        method: "GET",
        "credentials": "include"
      });
      const body: SpendingsResponse = await response.json() as SpendingsResponse;
      setResponseObj(body);
    };

    getSpendings();
  }, []);

  return (
    <>
      <h1>Here are your spendings: </h1>
      {
        responseObj?.spendings?.map((spending: Spending) => {
          const convertedDate: Date = new Date(spending.date);
          return <p key={spending.id}>{"Date entered: " + convertedDate.toDateString() + ". Category: " + spending.category + ". Amount: " + spending.amount}</p>
        })
      }
      <h2>Total Spent: {responseObj?.totalSpent}</h2>
      <h2>Total Spendings: {responseObj?.totalSpendings}</h2>
    </>
  );
}

export default Spendings;