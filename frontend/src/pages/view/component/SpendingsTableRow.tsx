import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { DATE_ISO_FORMAT, SAVE_SPENDINGS_PAGE } from "../../../utils/constants";
import MoneyUtils from "../../../utils/money-utils";
import { SpendingListRowLineChart } from "../../../utils/types";
import SpendingsTableRowButtons from "./SpendingsTableRowButtons";

type SpendingsTableRowProps = {
  spending: SpendingListRowLineChart;
  setSpendingToDelete: (spending: SpendingListRowLineChart) => void;
};

const SpendingsTableRow: FC<SpendingsTableRowProps> = ({
  spending,
  setSpendingToDelete,
}) => {
  const navigate = useNavigate();
  const handleEdit = () =>
    navigate(`${SAVE_SPENDINGS_PAGE}/${spending.date.format(DATE_ISO_FORMAT)}`);

  return (
    <tr className="border-b-2 leading-[3rem]">
      <td>
        <p>{spending.date.format("L")}</p>
      </td>

      <td className="text-center">
        <p className="text-right block">
          {MoneyUtils.formatMoney(spending.total)}
        </p>
      </td>

      <SpendingsTableRowButtons
        spending={spending}
        setSpendingToDelete={setSpendingToDelete}
        handleEdit={handleEdit}
      />
    </tr>
  );
};

export default SpendingsTableRow;
