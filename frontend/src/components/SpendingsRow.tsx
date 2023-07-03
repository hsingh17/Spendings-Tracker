import { FC } from "react";
import { useNavigate } from "react-router-dom";
import useDeleteSpending from "../hooks/useDeleteSpending";
import { Constants } from "../utils/constants";
import DateFormatter from "../utils/dates-formatter";
import { SpendingsRowProps } from "../utils/types";


const SpendingsRow: FC<SpendingsRowProps> = ({ spending, parentRefetch }) => {
  const navigate = useNavigate();
  const {mutate: deleteSpending} = useDeleteSpending(parentRefetch);

  const handleEdit = () => navigate(`${Constants.SAVE_SPENDINGS_PAGE}/${spending.date}`);

  return (
    <tr>
      <td>{ DateFormatter.formatDateUS(spending.date) }</td>
      <td> { spending.total } </td>
      <>
        <button onClick={_ => handleEdit()}>Edit</button>
        <br/>
        <button onClick={_ => deleteSpending(spending.spendingUserAggrId)}>Delete</button>
        <button>v</button>
      </>
    </tr>
  );
};

export default SpendingsRow;