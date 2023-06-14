import { Suspense, useState } from "react";
import SpendingsTable from "../components/SpendingsTable";
import ViewSpendingsButton from "../components/ViewSpendingsButton";
import ViewSpendingsFilterForm from "../components/ViewSpendingsFilterForm";
import LoadingSpinner from "../components/LoadingSpinner";
import { useSearchParams } from "react-router-dom";

const ViewSpendings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  return (
    <>
      <h1>Here are your spendings: </h1>
      <ViewSpendingsFilterForm parentSetApiUrl={ parentSetApiUrl } />
      <Suspense fallback={ <LoadingSpinner /> }>
        <SpendingsTable toggleRefresh={ toggleRefresh } spendingUserAggrList={ response.data } />
        <ViewSpendingsButton parentSetApiUrl={ parentSetApiUrl } buttonUrl={ response.metadata?.links.first } buttonText="first" />
        <ViewSpendingsButton parentSetApiUrl={ parentSetApiUrl } buttonUrl={ response.metadata?.links.prev } buttonText="<" />
        <ViewSpendingsButton parentSetApiUrl={ parentSetApiUrl } buttonUrl={ response.metadata?.links.next } buttonText=">" />
        <ViewSpendingsButton parentSetApiUrl={ parentSetApiUrl } buttonUrl={ response.metadata?.links.last } buttonText="last" />
      </Suspense>
    </>
  );
};

export default ViewSpendings;