import { useNavigate, useParams } from "react-router-dom";
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
  const {
    data: response,
    isError,
    isLoading,
  } = useSpending(params.date as string);
  const spendings = response?.data?.spendings;
  const isCreateMode = !spendings || spendings.length === 0;
  const handleDateChange = (spendingDate: string) =>
    navigate(`${SAVE_SPENDINGS_PAGE}/${spendingDate}`, {
      replace: true,
    });

  if (isError) {
    return <Error />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
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
