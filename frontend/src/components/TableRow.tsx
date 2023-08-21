import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as DeleteIcon } from "../assets/delete-icon.svg";
import { ReactComponent as EditIcon } from "../assets/edit-icon.svg";
import { Constants } from "../utils/constants";
import DateUtils from "../utils/date-utils";
import { TableRowProps } from "../utils/types";
import ShimmerLoadingBox from "./ShimmerLoadingBox";

const TableRow: FC<TableRowProps> = ({
  isLoading,
  spending,
  parentSetSpendingId
}) => {
  const navigate = useNavigate();

  const handleEdit = () =>
    navigate(`${Constants.SAVE_SPENDINGS_PAGE}/${spending.date}`);

  if (isLoading) {
    return (
      <tr className="border-gray-300 leading-[3rem]">
        <td><ShimmerLoadingBox /></td>
        <td><ShimmerLoadingBox /></td>
        <td><ShimmerLoadingBox /></td>
      </tr>
    );
  }

  return (
    <tr className="border-b-2 leading-[3rem]">
      <td>
        <p>{DateUtils.formatDateUS(spending.date)}</p>
      </td>

      <td className="text-center">
        <p className="text-right block">{spending.total}</p>
      </td>

      <td>
        <div className="flex justify-center items-center w-full">
          <button>
            <EditIcon
              className="h-7 w-fit mr-5"
              stroke={"#40A3E6"}
              onClick={() => handleEdit()}
            />
          </button>

          <button>
            <DeleteIcon
              className="h-7 w-fit"
              stroke={"red"}
              onClick={() => parentSetSpendingId(spending.spendingUserAggrId)}
            />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
