import { FC } from "react";
import { useNavigate } from "react-router-dom";
import DateFormatter from "../utils/dates-formatter";
import { GenericApiResponse, SpendingsRowProps } from "../utils/types";
import makeFetchRequestWrapper from "../utils/fetch-wrapper";
import { Constants } from "../utils/constants";


const SpendingsRow: FC<SpendingsRowProps> = ({ spendingsForADay: spendingForADay }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-spendings/${spendingForADay.date}`);
  };

  const handleDelete = async () => {
    const apiUrl: string = Constants.BASE_URL + Constants.DELETE_SPENDING_ROUTE + "/" + spendingForADay.date;
    const response = await makeFetchRequestWrapper<GenericApiResponse>(apiUrl, "DELETE", "");

    if (response.ok) {
      alert("successfully deleted!");
    } else {
      alert("could not delete!");
    }
  };

  return (
    <div>
      <h2>{ DateFormatter.formatDateUS(spendingForADay.date) }</h2>
      <h2> { spendingForADay.total } </h2>
      <>
        <button onClick={ () => { handleEdit() } }>Edit</button>
        <br/>
        <button onClick={ () => { handleDelete() } }>Delete</button>
        <button>v</button>
      </>
    </div>
  )
};

export default SpendingsRow;