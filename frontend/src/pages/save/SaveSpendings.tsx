import { useNavigate, useParams } from "react-router-dom";
import useSpending from "../../hooks/useSpending";
import { SAVE_SPENDINGS_PAGE } from "../../utils/constants";
import SaveSpendingsForm from "./component/SaveSpendingsForm";

type SaveSpendingProps = {
  date: string;
};

const SaveSpendings = () => {
  const navigate = useNavigate();
  const params = useParams<SaveSpendingProps>();
  const { data: response, isError } = useSpending(params.date as string);
  const spendings = response?.data?.spendings;
  const isCreateMode = !spendings || spendings.length === 0;
  const handleDateChange = (spendingDate: string) =>
    navigate(`${SAVE_SPENDINGS_PAGE}/${spendingDate}`, {
      replace: true,
    });

  if (isError) {
    return <h1>Error!</h1>; // TODO
  }

  return (
    <div className="md:p-3 flex flex-col items-center">
      <SaveSpendingsForm
        date={params.date as string}
        isCreateMode={isCreateMode}
        initialSpendings={spendings ? spendings : null}
        handleDateChange={handleDateChange}
      />
    </div>
  );
};

export default SaveSpendings;
