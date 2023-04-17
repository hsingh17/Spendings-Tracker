import { useState } from "react";
import SpendingsContainer from "../components/SpendingsContainer";
import ViewSpendingsButton from "../components/ViewSpendingsButton";
import ViewSpendingsFilterForm from "../components/ViewSpendingsFilterForm";
import useApi from "../hooks/useApi";
import { Constants } from "../utils/constants";
import { Nullable, SpendingsApiResponse } from "../utils/types";

const ViewSpendings = () => {
  const [ apiUrl, setApiUrl ] = useState<string>(Constants.BASE_API_URL + Constants.GET_SPENDING_API_ROUTE); // By default, get everything
  const { loading, response } = useApi<SpendingsApiResponse>(apiUrl, Constants.GET);

  const parentSetApiUrl = (apiUrl: Nullable<string>) => {
    if (!apiUrl) {
      return;
    }
    setApiUrl(apiUrl);
  };  

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
      <ViewSpendingsFilterForm parentSetApiUrl={ parentSetApiUrl } />
      <SpendingsContainer spendingsForADayList={ response.obj.spendingsForADayList } />
      <ViewSpendingsButton parentSetApiUrl={ parentSetApiUrl } buttonUrl={ response.obj.previous } buttonText="<" />
      <ViewSpendingsButton parentSetApiUrl={ parentSetApiUrl } buttonUrl={ response.obj.next } buttonText=">" />
    </>
  );
};

export default ViewSpendings;