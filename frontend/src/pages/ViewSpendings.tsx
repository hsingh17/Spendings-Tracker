import { useEffect, useState } from "react";
import { Spending, SpendingsApiResponse } from "../utils/types";
import { Constants } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import SpendingsList from "../components/SpendingsList";

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
    };

    getSpendings();
  }, []);

  return (
    <>
      <h1>Here are your spendings: </h1>
      {
        response ?
        
        Object.keys(response.spendings).map((spendingDate: String, idx: number) => {
          const spendingsArray: Array<Spending> = response?.spendings[spendingDate as string];
          return (
            <div key={ idx }>
              <h2>{ spendingDate }</h2>
              <SpendingsList spendingsArray={ spendingsArray }/>
            </div>
          );
        })
        
        :
        
        <h1>Loading...</h1>
      }
    </>
  );
}

export default ViewSpendings;