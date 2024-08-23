import { FC } from "react";
import { SpendingListRow } from "../../../utils/types";
import SpendingsTableRow from "./SpendingsTableRow";

type SpendingsTableBodyProps = {
  isLoading: boolean;
  spendings: SpendingListRow[];
  setSpendingId: (spendingId: number) => void;
};

const SpendingsTableBody: FC<SpendingsTableBodyProps> = ({
  isLoading,
  spendings,
  setSpendingId,
}) => {
  return (
    <tbody>
      {spendings.map((spending: SpendingListRow, idx: number) => {
        return (
          <SpendingsTableRow
            isLoading={isLoading}
            key={idx}
            spending={spending}
            setSpendingId={setSpendingId}
          />
        );
      })}
    </tbody>
  );
};

export default SpendingsTableBody;
