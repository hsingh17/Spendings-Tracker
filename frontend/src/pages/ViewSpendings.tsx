import { useSearchParams } from "react-router-dom";
import SpendingsTable from "../components/SpendingsTable";
import TableFilter from "../components/TableFilter";
import TableFooterContainer from "../components/TableFooterContainer";
import TableTitle from "../components/TableTitle";
import useSpendings from "../hooks/useSpendings";
import { ApiMetadata, Nullable, SpendingListRow } from "../utils/types";
import DeleteModal from "../components/DeleteModal";
import { useState } from "react";
import Card from "../components/Card";

const DUMMY_SPENDINGS: Array<SpendingListRow> = Array(25).fill({});

const ViewSpendings = () => {
  const [spendingId, setSpendingId] = useState<Nullable<number>>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    data: response,
    refetch,
    isLoading,
  } = useSpendings<SpendingListRow>(searchParams);
  const metadata: Nullable<ApiMetadata> | undefined = response?.metadata;

  const setSearchParamsWrapper = (urlSearchParams: URLSearchParams) => {
    urlSearchParams.forEach((value, key) => searchParams.set(key, value));
    setSearchParams(searchParams);
  };

  const resetSearchParamsWrapper = () => {
    searchParams.delete("start-date");
    searchParams.delete("end-date");
    setSearchParams(searchParams);
  };

  const setShowModalWrapper = (show: boolean) => setShowModal(show);
  const setSpendingIdWrapper = (spendingIdToDelete: number) => {
    setSpendingId(spendingIdToDelete);
    setShowModal(true);
  };

  const refetchWrapper = () => refetch();

  return (
    <>
      <Card>
        <TableTitle />

        <TableFilter
          isLoading={isLoading}
          parentResetSearchParams={resetSearchParamsWrapper}
          parentSetSearchParams={setSearchParamsWrapper}
        />

        <SpendingsTable
          isLoading={isLoading}
          key={response?.timestamp}
          spendings={isLoading ? DUMMY_SPENDINGS : response?.data}
          parentRefetch={refetchWrapper}
          parentSetSpendingId={setSpendingIdWrapper}
        />
      </Card>

      <TableFooterContainer
        isLoading={isLoading}
        key={response?.timestamp}
        apiMetaData={metadata}
        parentSetSearchParams={setSearchParamsWrapper}
      />

      <DeleteModal
        show={showModal}
        spendingId={spendingId}
        parentRefetch={refetch}
        parentSetShow={setShowModalWrapper}
      />
    </>
  );
};

export default ViewSpendings;
