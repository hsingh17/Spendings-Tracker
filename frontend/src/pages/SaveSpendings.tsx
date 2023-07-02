import { useNavigate, useParams } from "react-router-dom";
import { SaveSpendingProps } from "../utils/types";
import useSpending from "../hooks/useSpending";
import { Constants } from "../utils/constants";
import SaveSpendingsForm from "../components/SaveSpendingsForm";

const SaveSpendings = () => {
  const navigate = useNavigate();
  const params = useParams<SaveSpendingProps>();
  const {data: response} = useSpending(params.date as string);

  const handleDateChange = (spendingDate: string) => navigate(`${Constants.SAVE_SPENDINGS_PAGE}/${spendingDate}`)

  return (
    <SaveSpendingsForm 
      parentHandleDateChange={handleDateChange}
      date={params.date as string} 
      initialSpendings={response ? response.data : null}/>
  )
};

export default SaveSpendings;