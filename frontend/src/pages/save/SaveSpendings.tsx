import { useNavigate, useParams } from "react-router-dom";
import ApiCallBoundary from "../../common/ApiCallBoundary";
import LoadingSpinner from "../../common/LoadingSpinner";
import useSpending from "../../hooks/useSpending";
import { SAVE_SPENDINGS_PAGE } from "../../utils/constants";
import DateUtils from "../../utils/date-utils";
import Error from "../error/Error";
import SaveSpendingsForm from "./component/SaveSpendingsForm";

type SaveSpendingParams = {
  dateStr: string;
};

const SaveSpendings = () => {
  const navigate = useNavigate();
  const params = useParams<SaveSpendingParams>();
  const date = DateUtils.localDateFromString(params.dateStr);

  const handleDateChange = (spendingDate: Date) =>
    navigate(
      `${SAVE_SPENDINGS_PAGE}/${DateUtils.formatDateToRFC3339(spendingDate)}`,
      {
        replace: true,
      },
    );

  return (
    <ApiCallBoundary
      errorFallback={<Error />}
      loadingFallback={<LoadingSpinner />}
      useApiCall={() => useSpending(date)}
    >
      <div className="md:p-3 flex flex-col items-center">
        <SaveSpendingsForm date={date} handleDateChange={handleDateChange} />
      </div>
    </ApiCallBoundary>
  );
};

export default SaveSpendings;
