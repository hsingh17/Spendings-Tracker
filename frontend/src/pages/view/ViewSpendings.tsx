import { useSearchParams } from "react-router-dom";
import ApiCallBoundary from "../../common/ApiCallBoundary";
import useDeleteSpending from "../../hooks/useDeleteSpending";
import useSpendings from "../../hooks/useSpendings";
import useWarningModal from "../../hooks/useWarningModal";
import { SpendingListRow } from "../../utils/types";
import Error from "../error/Error";
import SpendingsTableLoadingShimmer from "./component/SpendingsTableLoadingShimmer";
import TableBody from "./component/TableBody";
import TableFooterContainer from "./component/TableFooterContainer";

const ViewSpendings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { mutate: deleteSpending } = useDeleteSpending(searchParams);
  const { modal, setModalState } = useWarningModal(
    "Delete Spending",
    "Are you sure you want to delete the spending?",
    "Delete Spending",
    "This action is not recoverable!",
  );

  const setSearchParamsWrapper = (urlSearchParams: URLSearchParams) => {
    setSearchParams(urlSearchParams);
  };

  const resetSearchParamsWrapper = () => {
    searchParams.delete("start-date");
    searchParams.delete("end-date");
    setSearchParams(searchParams);
  };

  const deleteSpendingWrapper = (spending: SpendingListRow) => {
    setModalState({
      show: true,
      callbackFn: () => {
        deleteSpending(spending.spendingUserAggrId);
      },
    });
  };

  return (
    <ApiCallBoundary
      errorFallback={<Error />}
      loadingFallback={<SpendingsTableLoadingShimmer />}
      useApiCall={() => useSpendings(searchParams)}
    >
      <div className="p-3">
        <TableBody
          resetSearchParams={resetSearchParamsWrapper}
          setSearchParams={setSearchParamsWrapper}
          setSpendingToDelete={deleteSpendingWrapper}
        />

        <TableFooterContainer setSearchParams={setSearchParamsWrapper} />

        {modal}
      </div>
    </ApiCallBoundary>
  );
};

export default ViewSpendings;
