import { FC } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../../common/Card";
import { SAVE_SPENDINGS_PAGE } from "../../../utils/constants";
import DateUtils from "../../../utils/date-utils";
import MoneyUtils from "../../../utils/money-utils";
import { SpendingListRow } from "../../../utils/types";

type RecentSpendingsCardProps = {
  spendingListRow: SpendingListRow;
};

const RecentSpendingsCard: FC<RecentSpendingsCardProps> = ({
  spendingListRow,
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`${SAVE_SPENDINGS_PAGE}/${spendingListRow.date}`)}
    >
      <Card className="mr-5 w-48 h-fit p-3 hover:cursor-pointer hover:opacity-50">
        <p className="font-medium text-theme-brand mb-auto">
          {DateUtils.formatDateUS(spendingListRow.date)}
        </p>
        <p className="font-semibold text-theme-cta text-xl mb-auto break-words">
          {MoneyUtils.formatMoney(spendingListRow.total)}
        </p>
      </Card>
    </div>
  );
};

export default RecentSpendingsCard;
