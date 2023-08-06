import { useSearchParams } from "react-router-dom";
import SpendingsTable from "../components/SpendingsTable";
import TableFooterContainer from "../components/TableFooterContainer";
import TableFilters from "../components/TableFilters";
import useSpendings from "../hooks/useSpendings";
import { ApiMetadata, Nullable, SpendingListRow } from "../utils/types";

const ViewSpendings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: response, refetch } =
    useSpendings<SpendingListRow>(searchParams);
  const metadata: Nullable<ApiMetadata> | undefined = response?.metadata;

  const setSearchParamsWrapper = (urlSearchParams: URLSearchParams) => {
    urlSearchParams.forEach((value, key) => searchParams.set(key, value));
    setSearchParams(searchParams);
  }

  const resetSearchParamsWrapper = () => {
    searchParams.delete("start-date");
    searchParams.delete("end-date");
    setSearchParams(searchParams);
  };

  const refetchWrapper = () => refetch();

  return (
    <div className="container p-5">
      <div className="border p-7 border-slate-950 rounded-lg shadow-md bg-white">
        <div className="flex md:flex-row flex-col">
          <h1 className="text-3xl md:text-2xl text-theme-brand font-bold">
            Spendings
          </h1>
          <button className="text-theme-neutral font-semibold md:ml-auto bg-theme-cta md:px-5 py-2 md:py-1.5 mt-5 md:mt-0">
            New Spending
          </button>
        </div>

        <TableFilters
          resetSearchParams={resetSearchParamsWrapper}
          parentSetSearchParams={setSearchParamsWrapper}
        />
        
        <SpendingsTable
          spendings={response?.data}
          parentRefetch={refetchWrapper}
        />
      </div>

      <TableFooterContainer
        apiMetaData={metadata}
        parentSetSearchParams={setSearchParamsWrapper}
      />
    </div>
  );
};

export default ViewSpendings;
