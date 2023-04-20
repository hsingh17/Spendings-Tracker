import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import DateFormatter from "../utils/dates-formatter";
import { SpendingsRowProps } from "../utils/types";
import SpendingsRowDelete from "./SpendingsRowDelete";
import { Constants } from "../utils/constants";


const SpendingsRow: FC<SpendingsRowProps> = ({ spendingsForADay, toggleRefresh }) => {
  const navigate = useNavigate();
  const [ performDelete, setPerformDelete ] = useState<boolean>(false);

  const handleEdit = () => navigate(`${Constants.EDIT_SPENDINGS_PAGE}/${spendingsForADay.date}`);
  const handleDelete = (perform: boolean) => setPerformDelete(perform);

  return (
    <tr>
      <td>{ DateFormatter.formatDateUS(spendingsForADay.date) }</td>
      <td> { spendingsForADay.total } </td>
      <>
        <button onClick={ () => handleEdit() }>Edit</button>
        <br/>
        <button onClick={ () => handleDelete(true) }>Delete</button>
        { performDelete && <SpendingsRowDelete spendingDate={ spendingsForADay.date } toggleRefresh={ toggleRefresh }/> }
        <button>v</button>
      </>
    </tr>
  );
};

export default SpendingsRow;