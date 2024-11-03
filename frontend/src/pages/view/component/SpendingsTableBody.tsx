import { FC } from "react";
import { SpendingListRow } from "../../../utils/types";
import SpendingsTableRow from "./SpendingsTableRow";

type SpendingsTableBodyProps = {
  spendings: SpendingListRow[];
  setSpendingToDelete: (spending: SpendingListRow) => void;
};

const SpendingsTableBody: FC<SpendingsTableBodyProps> = ({
  spendings,
  setSpendingToDelete,
}) => {
  return (
    <tbody>
      {spendings.map((spending: SpendingListRow, idx: number) => {
        return (
          <SpendingsTableRow
            key={idx}
            spending={spending}
            setSpendingToDelete={setSpendingToDelete}
          />
        );
      })}
    </tbody>
  );
};

export default SpendingsTableBody;
