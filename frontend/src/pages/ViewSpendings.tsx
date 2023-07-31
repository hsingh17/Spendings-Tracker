import { useSearchParams } from "react-router-dom";
import SpendingsTable from "../components/SpendingsTable";
import ViewSpendingsButton from "../components/ViewSpendingsButton";
import ViewSpendingsFilterForm from "../components/ViewSpendingsFilterForm";
import useSpendings from "../hooks/useSpendings";
import { ApiLinks, SpendingListRow } from "../utils/types";

const ViewSpendings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: response, refetch } =
    useSpendings<SpendingListRow>(searchParams);
  const links: ApiLinks | undefined = response?.metadata?.links;

  const setSearchParamsWrapper = (urlSearchParams: URLSearchParams) =>
    setSearchParams(urlSearchParams);
  const refetchWrapper = () => refetch();

  return (
    <div className="container p-5">
      <div className="border p-7 border-slate-950 rounded-lg shadow-md bg-white">
        <div className="flex md:flex-row flex-col">
          <h1 className="text-3xl md:text-2xl text-theme-brand font-bold">
            Spendings
          </h1>
          <button className="text-theme-neutral font-semibold md:ml-auto bg-theme-cta md:px-5 py-2 md:py-1.5 mt-3 md:mt-0">
            New Spending
          </button>
        </div>

        <ViewSpendingsFilterForm
          parentSetSearchParams={setSearchParamsWrapper}
        />
        <SpendingsTable
          spendings={response?.data}
          parentRefetch={refetchWrapper}
        />
        <ViewSpendingsButton
          parentSetSearchParams={setSearchParamsWrapper}
          buttonUrl={links?.first}
          buttonText="first"
        />
        <ViewSpendingsButton
          parentSetSearchParams={setSearchParamsWrapper}
          buttonUrl={links?.prev}
          buttonText="<"
        />
        <ViewSpendingsButton
          parentSetSearchParams={setSearchParamsWrapper}
          buttonUrl={links?.next}
          buttonText=">"
        />
        <ViewSpendingsButton
          parentSetSearchParams={setSearchParamsWrapper}
          buttonUrl={links?.last}
          buttonText="last"
        />
        <h2>{`Showing ${response?.metadata?.pageSize}`}</h2>
      </div>
    </div>
  );
};

export default ViewSpendings;
