import { FC } from "react";
import { useNavigate } from "react-router-dom";
import DateFormatter from "../utils/dates-formatter";
import { SpendingsRowProps } from "../utils/types";


const SpendingsRow: FC<SpendingsRowProps> = ({ spendingsForADay: spendingForADay }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-spendings/${spendingForADay.date}`);
  };

  return (
    <div>
      <h2>{ DateFormatter.formatDateUS(spendingForADay.date) }</h2>
      <h2> { spendingForADay.total } </h2>
      <>
        <button onClick={ () => { handleEdit()} }>Edit</button>
        <button>v</button>
      </>
    </div>
  )
};

export default SpendingsRow;