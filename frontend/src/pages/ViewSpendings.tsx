import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SpendingsContainer from "../components/SpendingsContainer";
import UserContext from "../contexts/UserContext";
import { Constants } from "../utils/constants";
import { SpendingsApiResponse, User } from "../utils/types";
import isLoggedIn from "../utils/user-logged-in-helper";
import ViewSpendingsFilterForm from "../components/ViewSpendingsFilterForm";
import useApi from "../hooks/useApi";

const ViewSpendings = () => {
  const { loading, response } = useApi<SpendingsApiResponse>(Constants.BASE_API_URL + Constants.GET_SPENDING_API_ROUTE, "GET");
  
  const handleFilterSearch = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const formObj = e.target as typeof e.target & {
      startDateInput: { value: string },
      endDateInput: { value: string },
      pageLimitInput: { value: string }
    };

    const startDate: string = formObj.startDateInput.value;
    const endDate: string = formObj.endDateInput.value;
    const pageLimit: string = formObj.pageLimitInput.value;

    let apiUrl: URL = new URL(Constants.BASE_API_URL + Constants.GET_SPENDING_API_ROUTE);
    
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
  }

  const handleClickPageButtons = (dir: number) => {
    if (!response) {
      console.error("Response is null!"); // TODO
      return;
    }

    switch (dir) {
      case -1:
        fetchSpendings(response.previous as string);
        break;
      case 1:
        fetchSpendings(response.next as string);
        break;
    }
  }

  // TODO: Below error handling is temporary
  if (spendingsLoading) {
    return <h1>Loading...</h1>;
  }  

  if (!spendingsResponse?.ok) {
    return <h1>{spendingsResponse?.error}</h1>;
  }

  return (
    <>
      <h1>Here are your spendings: </h1>
      
      <ViewSpendingsFilterForm />
          
      <SpendingsContainer spendingsForADayList={ response.spendingsForADayList } />

      <button onClick={ _ => handleClickPageButtons(-1) } disabled={ response.previous === null }>&lt;</button>
      <button onClick={ _ => handleClickPageButtons(1) } disabled={ response.next === null }> &gt;</button>
    </>
  );
};

export default ViewSpendings;