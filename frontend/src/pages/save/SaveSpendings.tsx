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
  const spendings = response?.data?.spendings;
  const isCreateMode = !spendings || spendings.length === 0;
  const handleDateChange = (spendingDate: string) =>
    navigate(`${SAVE_SPENDINGS_PAGE}/${spendingDate}`, {
      replace: true,
    });

  if (!response || !response.ok || !response.data) {
    <h1>Error!</h1>; // TODO
  }

  return (
    <div className="p-3">
      <SaveSpendingsTitle
        date={params.date || DateUtils.getCurrentDate()}
        isCreateMode={isCreateMode}
        parentHandleDateChange={handleDateChange}
      />

      <SaveSpendingsForm
        date={params.date as string}
        isCreateMode={isCreateMode}
        initialSpendings={spendings ? spendings : null}
      />
    </div>
  );
};

export default SaveSpendings;
