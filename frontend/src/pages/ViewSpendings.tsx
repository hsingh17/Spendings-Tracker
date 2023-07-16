import { useSearchParams } from "react-router-dom";
import SpendingsTable from "../components/SpendingsTable";
import ViewSpendingsButton from "../components/ViewSpendingsButton";
import ViewSpendingsFilterForm from "../components/ViewSpendingsFilterForm";
import useSpendings from "../hooks/useSpendings";
import { ApiLinks, SpendingListRow } from "../utils/types";

const ViewSpendings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {data: response, refetch} = useSpendings<SpendingListRow>(searchParams);
  const links: ApiLinks | undefined = response?.metadata?.links;

  const setSearchParamsWrapper = (urlSearchParams: URLSearchParams) => setSearchParams(urlSearchParams); 
  const refetchWrapper = () => refetch();

  return (
    <div className="container mx-auto">
      <div className="overflow-hidden">
        <h1>Spendings</h1>
        <button className="float-right">Create new Spending</button>
      </div>

      <ViewSpendingsFilterForm parentSetSearchParams={setSearchParamsWrapper}/>
      <SpendingsTable spendings={response?.data} parentRefetch={refetchWrapper}/>
      <ViewSpendingsButton parentSetSearchParams={setSearchParamsWrapper} buttonUrl={links?.first} buttonText="first" />
      <ViewSpendingsButton parentSetSearchParams={setSearchParamsWrapper} buttonUrl={links?.prev} buttonText="<" />
      <ViewSpendingsButton parentSetSearchParams={setSearchParamsWrapper} buttonUrl={links?.next} buttonText=">" />
      <ViewSpendingsButton parentSetSearchParams={setSearchParamsWrapper} buttonUrl={links?.last} buttonText="last" />
      <h2>{`Showing ${response?.metadata?.pageSize}`}</h2>
    </div> 
  );
};

export default ViewSpendings;