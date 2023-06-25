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
      <ViewSpendingsFilterForm />
      <Suspense fallback={ <LoadingSpinner /> }>
        <SpendingsTable spendingUserAggrList={ } />
        <ViewSpendingsButton buttonUrl={ } buttonText="first" />
        <ViewSpendingsButton buttonUrl={ } buttonText="<" />
        <ViewSpendingsButton buttonUrl={ } buttonText=">" />
        <ViewSpendingsButton buttonUrl={ } buttonText="last" />
      </Suspense>
    </>
  );
};

export default ViewSpendings;