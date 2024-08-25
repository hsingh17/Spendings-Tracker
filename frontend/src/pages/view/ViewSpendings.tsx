import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useSpendings from "../../hooks/useSpendings";
import { ApiMetadata, Nullable } from "../../utils/types";
import DeleteSpendingModal from "./component/DeleteSpendingModal";
import TableBody from "./component/TableBody";
import TableFooterContainer from "./component/TableFooterContainer";

const ViewSpendings = () => {
  const [spendingId, setSpendingId] = useState<Nullable<number>>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    data: response,
    refetch,
    isLoading,
    isError,
  } = useSpendings(searchParams);
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

  if (isError) {
    alert("TODO");
    return <></>;
  }

  return (
    <div className="p-3">
      <TableBody
        isLoading={isLoading}
        timestamp={response?.timestamp}
        spendings={response?.data?.spendingPage.content}
        resetSearchParams={resetSearchParamsWrapper}
        setSearchParams={setSearchParamsWrapper}
        setSpendingId={setSpendingIdWrapper}
      />

      <TableFooterContainer
        isLoading={isLoading}
        key={response?.timestamp}
        apiMetaData={metadata}
        setSearchParams={setSearchParamsWrapper}
      />

      <DeleteSpendingModal
        show={showModal}
        spendingId={spendingId}
        refetch={refetch}
        setShow={setShowModalWrapper}
      />
    </div>
  );
};

export default ViewSpendings;
