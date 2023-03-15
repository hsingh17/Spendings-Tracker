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

    console.log(response.obj);
    setResponse(response.obj as SpendingsApiResponse);
  }

  const handleFilterSearch = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const formObj = e.target as typeof e.target & {
      startDateInput: { value: string },
      endDateInput: { value: string },
      pageLimitInput: { value: string }
    };

    const startDate: Nullable<string> = formatDate(formObj.startDateInput.value);
    const endDate: Nullable<string> = formatDate(formObj.endDateInput.value);
    const pageLimit: string = formObj.pageLimitInput.value;

    let apiUrl: URL = new URL(Constants.BASE_URL + Constants.GET_SPENDING_ROUTE);
    
    if (startDate) {
      apiUrl.searchParams.append("start-date", startDate);
    }

    if (endDate) {
      apiUrl.searchParams.append("end-date", endDate);
    }

    if (pageLimit) {
      apiUrl.searchParams.append("limit", pageLimit);
    }

    fetchSpendings(apiUrl.toString());
  };  

  const handleClickPageButtons = (dir: number) => {
    if (!response) {
      console.error("Response is null!");
      return;
    }

    switch (dir) {
      case -1:
        fetchSpendings(response.previous as string);
        break;
      case 1:
        fetchSpendings(response.next as string);
        break;
      default:
        console.error("Where you going!");
    }
  }

  useEffect(() => {
    const initialPageLoadFetch = async () => {
      isLoggedIn(user, setUser, navigate, null, "/login");
      const apiUrl: string = Constants.BASE_URL + Constants.GET_SPENDING_ROUTE;
      fetchSpendings(apiUrl);
    };

    initialPageLoadFetch();
  }, []);

  if (!response) {
    return <h1>Loading...</h1>
  }
  
  return (
    <>
      <h1>Here are your spendings: </h1>
      
      <form onSubmit={ (e: React.FormEvent) => { handleFilterSearch(e) }}>
        <label htmlFor="start-date">Start Date:</label>
        <input type="date" id="start-date" name="startDateInput" />
        <br />

        <label htmlFor="end-date">End Date:</label>
        <input type="date" id="end-date" name="endDateInput" />
        <br />
        
        <label htmlFor="page-limit">Limit page to show:</label>
        <select name="pageLimitInput">
          {
            Constants.PAGE_LIMITS.map((limit: String, idx: number) => {
              return <option key={ `${limit}-${idx}` }>{limit}</option>
            })
          }
        </select>
        <br />

        <button type="submit">Search</button>
        <button type="reset">Reset filters</button>
      </form>

      {
        Object.keys(response.spendings).map((spendingDate: String, idx: number) => {
          const spendingsArray: Array<Spending> = response?.spendings[spendingDate as string];
          return <SpendingsList key={ idx } spendingDate={ spendingDate } spendingsArray={ spendingsArray }/>
        })
      }

      <button onClick={ _ => handleClickPageButtons(-1) } disabled={ response.previous === null }>&lt;</button>
      <button onClick={ _ => handleClickPageButtons(1) } disabled={ response.next === null }> &gt;</button>
    </>
  );
}

export default ViewSpendings;