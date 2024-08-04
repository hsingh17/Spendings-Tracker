import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as DeleteIcon } from "../../../assets/raw/delete-icon.svg";
import { ReactComponent as EditIcon } from "../../../assets/raw/edit-icon.svg";
import ShimmerLoadingBox from "../../../common/ShimmerLoadingBox";
import { SAVE_SPENDINGS_PAGE } from "../../../utils/constants";
import DateUtils from "../../../utils/date-utils";
import MoneyUtils from "../../../utils/money-utils";
import { TableRowProps } from "../../../utils/types";

const TableRow: FC<TableRowProps> = ({
  isLoading,
  spending,
  parentSetSpendingId,
}) => {
  const navigate = useNavigate();

  const handleEdit = () => navigate(`${SAVE_SPENDINGS_PAGE}/${spending.date}`);

  if (isLoading) {
    return (
      // TODO: Make a component
      <tr className="border-gray-300 leading-[3rem]">
        <td>
          <ShimmerLoadingBox />
        </td>
        <td>
          <ShimmerLoadingBox />
        </td>
        <td>
          <ShimmerLoadingBox />
        </td>
      </tr>
    );
  }

  return (
    <tr className="border-b-2 leading-[3rem]">
      <td>
        <p>{DateUtils.formatDateUS(spending.date)}</p>
      </td>

      <td className="text-center">
        <p className="text-right block">
          {MoneyUtils.formatMoney(spending.total)}
        </p>
      </td>

      {/* TODO: Make component */}
      <td>
        <div className="flex justify-center items-center w-full">
          <button>
            <EditIcon
              className="h-7 w-7 mr-5"
              stroke={"#40A3E6"}
              onClick={() => handleEdit()}
            />
          </button>

          <button>
            <DeleteIcon
              className="h-7 w-7"
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
