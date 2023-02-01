import { useContext, useEffect, useState } from "react";
import { Spending, SpendingsApiResponse, User } from "../utils/types";
import { Constants } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import SpendingsList from "../components/SpendingsList";
import UserContext from "../contexts/UserContext";
import isLoggedIn from "../utils/user-logged-in-helper";

const ViewSpendings = () => {
  const { user, setUser } = useContext(UserContext);
  const [ response, setResponse ] = useState<SpendingsApiResponse>();
  const navigate = useNavigate();

  useEffect(() => {
    const getSpendings = async () => {
      isLoggedIn(user, setUser, navigate, null, "/login");

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
          return <SpendingsList key={ idx } spendingDate={ spendingDate } spendingsArray={ spendingsArray }/>
        })
        
        :
        
        <h1>Loading...</h1>
      }
    </>
  );
}

export default ViewSpendings;