import { useSearchParams } from "react-router-dom";
import SpendingsTable from "../components/SpendingsTable";
import TableFooterContainer from "../components/TableFooterContainer";
import TableFilter from "../components/TableFilter";
import useSpendings from "../hooks/useSpendings";
import { ApiMetadata, Nullable, SpendingListRow } from "../utils/types";
import TableTitle from "../components/TableTitle";

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
        <TableTitle />

        <TableFilter
          parentResetSearchParams={resetSearchParamsWrapper}
          parentSetSearchParams={setSearchParamsWrapper}
        />
        
        <SpendingsTable
          key={response?.timestamp}
          spendings={response?.data}
          parentRefetch={refetchWrapper}
        />
      </div>

      <TableFooterContainer
        key={response?.timestamp}
        apiMetaData={metadata}
        parentSetSearchParams={setSearchParamsWrapper}
      />
    </div>
  );
};

export default ViewSpendings;
