import { useNavigate, useParams } from "react-router-dom";
import ApiCallBoundary from "../../common/ApiCallBoundary";
import LoadingSpinner from "../../common/LoadingSpinner";
import useSpending from "../../hooks/useSpending";
import { SAVE_SPENDINGS_PAGE } from "../../utils/constants";
import Error from "../error/Error";
import SaveSpendingsForm from "./component/SaveSpendingsForm";

type SaveSpendingProps = {
  date: string;
};

const SaveSpendings = () => {
  const navigate = useNavigate();
  const params = useParams<SaveSpendingProps>();
  const handleDateChange = (spendingDate: string) =>
    navigate(`${SAVE_SPENDINGS_PAGE}/${spendingDate}`, {
      replace: true,
    });

  return (
    <ApiCallBoundary
      errorFallback={<Error />}
      loadingFallback={<LoadingSpinner />}
      useApiCall={() => useSpending(params.date as string)}
    >
      <div className="md:p-3 flex flex-col items-center">
        <SaveSpendingsForm
          date={params.date as string}
          handleDateChange={handleDateChange}
        />
      </div>
    </ApiCallBoundary>
  );
};

export default SaveSpendings;
