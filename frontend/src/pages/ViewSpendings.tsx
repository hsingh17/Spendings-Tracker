import SpendingsTable from "../components/SpendingsTable";
import ViewSpendingsButton from "../components/ViewSpendingsButton";
import ViewSpendingsFilterForm from "../components/ViewSpendingsFilterForm";
import { useSearchParams } from "react-router-dom";
import useSpendings from "../hooks/useSpendings";
import { ApiLinks, Nullable } from "../utils/types";

const ViewSpendings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {data: response, refetch} = useSpendings(searchParams);
  const links: ApiLinks | undefined = response?.metadata?.links;

  const setSearchParamsWrapper = (urlSearchParams: URLSearchParams) => {
    setSearchParams(urlSearchParams); 
  };

  const refetchWrapper = () => {
    refetch();
  };

  return (
    <>
      <h1>Here are your spendings: </h1>
      <ViewSpendingsFilterForm parentSetSearchParams={setSearchParamsWrapper}/>
      <SpendingsTable spendings={response?.data} parentRefetch={refetchWrapper}/>
      <ViewSpendingsButton parentSetSearchParams={setSearchParamsWrapper} buttonUrl={links?.first} buttonText="first" />
      <ViewSpendingsButton parentSetSearchParams={setSearchParamsWrapper} buttonUrl={links?.prev} buttonText="<" />
      <ViewSpendingsButton parentSetSearchParams={setSearchParamsWrapper} buttonUrl={links?.next} buttonText=">" />
      <ViewSpendingsButton parentSetSearchParams={setSearchParamsWrapper} buttonUrl={links?.last} buttonText="last" />
    </>
  );
};

export default ViewSpendings;