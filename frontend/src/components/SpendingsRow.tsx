import { FC } from "react";
import { useNavigate } from "react-router-dom";
import useDeleteSpending from "../hooks/useDeleteSpending";
import { Constants } from "../utils/constants";
import DateFormatter from "../utils/dates-formatter";
import { SpendingsRowProps } from "../utils/types";
import { ReactComponent as EditIcon } from "../assets/edit-icon.svg";
import { ReactComponent as DeleteIcon } from "../assets/delete-icon.svg";

const SpendingsRow: FC<SpendingsRowProps> = ({ spending, parentRefetch }) => {
  const navigate = useNavigate();
  const { mutate: deleteSpending } = useDeleteSpending(parentRefetch);

  const handleEdit = () =>
    navigate(`${Constants.SAVE_SPENDINGS_PAGE}/${spending.date}`);

  return (
    <tr className="border-b-2 leading-[3rem]">
      <td className="">{DateFormatter.formatDateUS(spending.date)}</td>
      <td className="text-center">
        <p className="text-right block">{spending.total}</p>
      </td>
      <td className="flex justify-center items-center mt-3">
        <button>
          <EditIcon className="h-7 w-20"  stroke={"#40A3E6"} onClick={() => handleEdit()} />
        </button>
        <br />
        <DeleteIcon className="h-7 w-20" stroke={"red"} onClick={_ => deleteSpending(spending.spendingUserAggrId)} />
      </td>
    </tr>
  );
};

export default SpendingsRow;
