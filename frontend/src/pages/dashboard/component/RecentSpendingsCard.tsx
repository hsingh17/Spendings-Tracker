import { useNavigate } from "react-router-dom";
import { Constants } from "../../../utils/constants";
import DateUtils from "../../../utils/date-utils";
import MoneyUtils from "../../../utils/money-utils";
import Card from "../../../common/Card";
import { SpendingListRow } from "../../../utils/types";
import { FC } from "react";

type RecentSpendingsCardProps = {
  spendingListRow: SpendingListRow;
};

const RecentSpendingsCard: FC<RecentSpendingsCardProps> = ({
  spendingListRow,
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() =>
        navigate(`${Constants.SAVE_SPENDINGS_PAGE}/${spendingListRow.date}`)
      }
    >
      <Card customStyles="mr-5 w-60 h-fit p-3 hover:cursor-pointer hover:opacity-50">
        <p className="font-medium text-theme-brand mb-auto">
          {DateUtils.formatDateUS(spendingListRow.date)}
        </p>
        <p className="font-semibold text-theme-cta text-xl mb-auto break-words">
          {MoneyUtils.formatMoneyUsd(spendingListRow.total)}
        </p>
      </Card>
    </div>
  );
};

export default RecentSpendingsCard;
