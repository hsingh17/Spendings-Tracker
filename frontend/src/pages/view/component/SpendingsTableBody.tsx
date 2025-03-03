import { FC } from "react";
import { SpendingListRowLineChart } from "../../../utils/types";
import SpendingsTableRow from "./SpendingsTableRow";

type SpendingsTableBodyProps = {
  spendings: SpendingListRowLineChart[];
  setSpendingToDelete: (spending: SpendingListRowLineChart) => void;
};

const SpendingsTableBody: FC<SpendingsTableBodyProps> = ({
  spendings,
  setSpendingToDelete,
}) => {
  return (
    <tbody>
      {spendings.map((spending: SpendingListRowLineChart, idx: number) => {
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
