import { useNavigate, useParams } from "react-router-dom";
import useSpending from "../../hooks/useSpending";
import { SAVE_SPENDINGS_PAGE } from "../../utils/constants";
import DateUtils from "../../utils/date-utils";
import { SaveSpendingProps } from "../../utils/types";
import SaveSpendingsForm from "./component/SaveSpendingsForm";
import SaveSpendingsTitle from "./component/SaveSpendingsTitle";

const SaveSpendings = () => {
  const navigate = useNavigate();
  const params = useParams<SaveSpendingProps>();
  const { data: response } = useSpending(params.date as string);

  const handleDateChange = (spendingDate: string) =>
    navigate(`${SAVE_SPENDINGS_PAGE}/${spendingDate}`, {
      replace: true,
    });

  return (
    <div className="p-3">
      <SaveSpendingsTitle
        date={params.date || DateUtils.getCurrentDate()}
        isCreateMode={!response?.data || response.data.length === 0}
        parentHandleDateChange={handleDateChange}
      />

      <SaveSpendingsForm
        date={params.date as string}
        isCreateMode={!response?.data || response.data.length === 0}
        initialSpendings={response ? response.data : null}
      />
    </div>
  );
};

export default SaveSpendings;
