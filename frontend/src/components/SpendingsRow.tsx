import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Constants } from "../utils/constants";
import DateFormatter from "../utils/dates-formatter";
import { GenericApiResponse, SpendingsRowProps } from "../utils/types";


const SpendingsRow: FC<SpendingsRowProps> = ({ spendingsForADay }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-spendings/${spendingsForADay.date}`);
  };

  const handleDelete = async () => {
    const apiUrl: string = Constants.BASE_API_URL + Constants.DELETE_SPENDING_API_ROUTE + "/" + spendingsForADay.date;
    const response = await fetchRequestWrapper<GenericApiResponse>(apiUrl, "DELETE", "");

    if (response.ok) {
      alert("successfully deleted!");
    } else {
      alert("could not delete!");
    }
  };

  return (
    <tr>
      <td>{ DateFormatter.formatDateUS(spendingsForADay.date) }</td>
      <td> { spendingsForADay.total } </td>
      <>
        <button onClick={ () => { handleEdit() } }>Edit</button>
        <br/>
        <button onClick={ () => { handleDelete() } }>Delete</button>
        <button>v</button>
      </>
    </tr>
  );
};

export default SpendingsRow;