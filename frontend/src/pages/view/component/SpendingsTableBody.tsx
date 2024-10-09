import { FC } from "react";
import { SpendingListRow } from "../../../utils/types";
import SpendingsTableRow from "./SpendingsTableRow";

type SpendingsTableBodyProps = {
  spendings: SpendingListRow[];
  setSpendingId: (spendingId: number) => void;
};

const SpendingsTableBody: FC<SpendingsTableBodyProps> = ({
  spendings,
  setSpendingId,
}) => {
  return (
    <tbody>
      {spendings.map((spending: SpendingListRow, idx: number) => {
        return (
          <SpendingsTableRow
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
