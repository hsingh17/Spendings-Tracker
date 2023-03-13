import React, { useContext, useEffect, useState } from "react";
import { Nullable, Spending, SpendingsApiResponse, User } from "../utils/types";
import { Constants } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import SpendingsList from "../components/SpendingsList";
import UserContext from "../contexts/UserContext";
import isLoggedIn from "../utils/user-logged-in-helper";
import formatDate from "../utils/dates-formatter";
import makeFetchRequestWrapper from "../utils/fetch-wrapper";

const ViewSpendings = () => {
  const { user, setUser } = useContext(UserContext);
  const [ response, setResponse ] = useState<SpendingsApiResponse>();
  const navigate = useNavigate();
  
  const fetchSpendings = async (apiUrl: string ) => {
    const response = await makeFetchRequestWrapper<SpendingsApiResponse>(apiUrl, "GET", "");
    if (!response.ok) {
      // TODO:
      console.error("Fetch failed!");
      return;
    }

    console.log(response.obj)
    setResponse(response.obj as SpendingsApiResponse);
  }
  const handleFilterSearch = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const dates = e.target as typeof e.target & {
      startDateInput: { value: string },
      endDateInput: { value: string }
    };

    const startDate: Nullable<string> = formatDate(dates.startDateInput.value);
    const endDate: Nullable<string> = formatDate(dates.endDateInput.value);
    let apiUrl: URL = new URL(Constants.BASE_URL + "/api/spending/get-spending");
    
    if (startDate !== null) {
      apiUrl.searchParams.append("start-date", startDate);
    }

    if (endDate !== null) {
      apiUrl.searchParams.append("end-date", endDate);
    }

    fetchSpendings(apiUrl.toString());
  };  

  useEffect(() => {
    const initialPageLoadFetch = async () => {
      isLoggedIn(user, setUser, navigate, null, "/login");
      const apiUrl: string = Constants.BASE_URL + "/api/spending/get-spending";
      fetchSpendings(apiUrl);
    };

    initialPageLoadFetch();
  }, []);

  return (
    <>
      <h1>Here are your spendings: </h1>
      
      <form onSubmit={ (e: React.FormEvent) => { handleFilterSearch(e) }}>
        <label htmlFor="start-date">Start Date:</label>
        <input type="date" id="start-date" name="startDateInput" />

        <label htmlFor="end-date">End Date:</label>
        <input type="date" id="end-date" name="endDateInput" />
        
        <button type="submit">Search</button>
      </form>

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