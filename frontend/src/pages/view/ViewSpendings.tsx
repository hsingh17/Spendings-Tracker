import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ApiCallBoundary from "../../common/ApiCallBoundary";
import useSpendings from "../../hooks/useSpendings";
import { Nullable } from "../../utils/types";
import Error from "../error/Error";
import DeleteSpendingModal from "./component/DeleteSpendingModal";
import SpendingsTableLoadingShimmer from "./component/SpendingsTableLoadingShimmer";
import TableBody from "./component/TableBody";
import TableFooterContainer from "./component/TableFooterContainer";

const ViewSpendings = () => {
  const [spendingId, setSpendingId] = useState<Nullable<number>>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const setSearchParamsWrapper = (urlSearchParams: URLSearchParams) => {
    setSearchParams(urlSearchParams);
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

  return (
    <ApiCallBoundary
      errorFallback={<Error />}
      loadingFallback={<SpendingsTableLoadingShimmer />}
      useApiCall={() => useSpendings(searchParams)}
      needRefetch={true}
    >
      <div className="p-3">
        <TableBody
          resetSearchParams={resetSearchParamsWrapper}
          setSearchParams={setSearchParamsWrapper}
          setSpendingId={setSpendingIdWrapper}
        />

        <TableFooterContainer setSearchParams={setSearchParamsWrapper} />

        <DeleteSpendingModal
          show={showModal}
          spendingId={spendingId}
          setShow={setShowModalWrapper}
        />
      </div>
    </ApiCallBoundary>
  );
};

export default ViewSpendings;
