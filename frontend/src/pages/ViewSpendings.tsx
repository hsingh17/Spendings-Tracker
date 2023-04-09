import React from "react";
import SpendingsContainer from "../components/SpendingsContainer";
import ViewSpendingsFilterForm from "../components/ViewSpendingsFilterForm";
import useApi from "../hooks/useApi";
import { Constants } from "../utils/constants";
import { SpendingsApiResponse } from "../utils/types";

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
  if (loading) {
    return <h1>Loading...</h1>;
  }  

  if (!response || !response?.ok || !response.obj) {
    return <h1>{response?.error}</h1>;
  }

  return (
    <>
      <h1>Here are your spendings: </h1>
      
      <ViewSpendingsFilterForm />
          
      <SpendingsContainer spendingsForADayList={ response.obj?.spendingsForADayList } />

      <button onClick={ _ => handleClickPageButtons(-1) } disabled={ response.obj?.previous === null }>&lt;</button>
      <button onClick={ _ => handleClickPageButtons(1) } disabled={ response.obj?.next === null }> &gt;</button>
    </>
  );
};

export default ViewSpendings;