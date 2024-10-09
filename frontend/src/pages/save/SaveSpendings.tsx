import { Dayjs } from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import ApiCallBoundary from "../../common/ApiCallBoundary";
import LoadingSpinner from "../../common/LoadingSpinner";
import CustomDayJs from "../../config/DayJsConfig";
import useSpending from "../../hooks/useSpending";
import { DATE_ISO_FORMAT, SAVE_SPENDINGS_PAGE } from "../../utils/constants";
import Error from "../error/Error";
import SaveSpendingsForm from "./component/SaveSpendingsForm";

type SaveSpendingParams = {
  dateStr: string;
};

const SaveSpendings = () => {
  const navigate = useNavigate();
  const params = useParams<SaveSpendingParams>();
  const date = CustomDayJs(params.dateStr);

  const handleDateChange = (spendingDate: Dayjs) =>
    navigate(`${SAVE_SPENDINGS_PAGE}/${spendingDate.format(DATE_ISO_FORMAT)}`, {
      replace: true,
    });

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
