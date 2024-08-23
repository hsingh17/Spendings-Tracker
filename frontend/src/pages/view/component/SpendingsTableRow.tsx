import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { SAVE_SPENDINGS_PAGE } from "../../../utils/constants";
import DateUtils from "../../../utils/date-utils";
import MoneyUtils from "../../../utils/money-utils";
import { SpendingListRow } from "../../../utils/types";
import SpendingsTableLoadingShimmer from "./SpendingsTableLoadingShimmer";
import SpendingsTableRowButtons from "./SpendingsTableRowButtons";

type SpendingsTableRowProps = {
  isLoading: boolean;
  spending: SpendingListRow;
  setSpendingId: (spendingId: number) => void;
};

const SpendingsTableRow: FC<SpendingsTableRowProps> = ({
  isLoading,
  spending,
  setSpendingId,
}) => {
  const navigate = useNavigate();

  const handleEdit = () => navigate(`${SAVE_SPENDINGS_PAGE}/${spending.date}`);

  if (isLoading) {
    return <SpendingsTableLoadingShimmer />;
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

      <SpendingsTableRowButtons
        spendingId={spending.spendingUserAggrId}
        setSpendingId={setSpendingId}
        handleEdit={handleEdit}
      />
    </tr>
  );
};

export default SpendingsTableRow;
