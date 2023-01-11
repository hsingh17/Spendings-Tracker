import React, { useEffect, useState } from "react";
import { Spending, SpendingsApiResponse } from "../utils/types";
import { Constants } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const ViewSpendings = () => {
  const [ response, setResponse ] = useState<SpendingsApiResponse>();
  const navigate = useNavigate();

  const handleEdit = (date: String, idx: number) => {
    navigate("/edit-spending");
  };

  useEffect(() => {
    const getSpendings = async () => {
      const apiUrl: string = Constants.BASE_URL + "/api/spending/get-spending";
      const response = await fetch(apiUrl, {
        method: "GET",
        credentials: "include"
      });

      const body: SpendingsApiResponse = await response.json() as SpendingsApiResponse;
      setResponse(body);
      console.log(body)
    };

    getSpendings();
  }, []);

  // TODO: Make this a component 
  return (
    <>
      <h1>Here are your spendings: </h1>
      {
        Object.keys(response?.spendings || {}).map((spendingDate: String, idx: number) => {
          return (
            <div key={ idx }>
              <h1>{ spendingDate }</h1>
              {
                response?.spendings[spendingDate as string].map((spending: Spending) => {
                  return <p key={ spending.id }>{`Category: ${spending.category}. Amount: ${spending.amount}`}</p>
                })
              }
            </div>
          );
        })
      }
    </>
  );
}

export default ViewSpendings;