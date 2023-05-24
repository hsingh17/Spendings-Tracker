import { useState } from "react";
import SpendingsTable from "../components/SpendingsTable";
import ViewSpendingsButton from "../components/ViewSpendingsButton";
import ViewSpendingsFilterForm from "../components/ViewSpendingsFilterForm";
import useApi from "../hooks/useApi";
import { Constants } from "../utils/constants";
import { Nullable, ApiResponse, SpendingUserAggr } from "../utils/types";

const ViewSpendings = () => {
  const [ apiUrl, setApiUrl ] = useState<string>(Constants.BASE_API_URL + Constants.SPENDINGS_API_ROUTE); // By default, get everything
  const { loading, response } = useApi<Array<SpendingUserAggr>>(apiUrl, Constants.GET);

  const toggleRefresh = () => window.location.reload(); // TODO: Would rather refetch the API then do this. Can put a reload button on the page

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

  if (!response || !response?.ok || !response.data) {
    return <h1>{response?.message}</h1>;
  }

  return (
    <>
      <h1>Here are your spendings: </h1>
      <ViewSpendingsFilterForm parentSetApiUrl={ parentSetApiUrl } />
      <SpendingsTable toggleRefresh={ toggleRefresh } spendingUserAggrList={ response.data } />
      { (response.metadata !== null) ? <ViewSpendingsButton parentSetApiUrl={ parentSetApiUrl } buttonUrl={ response.metadata?.links.first } buttonText="first" /> : <></>}
      { (response.metadata !== null) ? <ViewSpendingsButton parentSetApiUrl={ parentSetApiUrl } buttonUrl={ response.metadata?.links.prev } buttonText="<" /> : <></>}
      { (response.metadata !== null) ? <ViewSpendingsButton parentSetApiUrl={ parentSetApiUrl } buttonUrl={ response.metadata?.links.next } buttonText=">" /> : <></>}
      { (response.metadata !== null) ? <ViewSpendingsButton parentSetApiUrl={ parentSetApiUrl } buttonUrl={ response.metadata?.links.last } buttonText="last" /> : <></>}
    </>
  );
};

export default ViewSpendings;