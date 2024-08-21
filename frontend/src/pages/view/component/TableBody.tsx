import { FC } from "react";
import { SpendingListRow } from "../../../utils/types";
import TableRow from "./TableRow";

type TableBodyProps = {
  isLoading: boolean;
  spendings: SpendingListRow[];
  parentRefetch: () => void;
  setSpendingId: (spendingId: number) => void;
};

const TableBody: FC<TableBodyProps> = ({
  isLoading,
  spendings,
  parentRefetch,
  setSpendingId,
}) => {
  return (
    <tbody>
      {spendings.map((spending: SpendingListRow, idx: number) => {
        return (
          <TableRow
            isLoading={isLoading}
            key={idx}
            spending={spending}
            parentRefetch={parentRefetch}
            setSpendingId={setSpendingId}
          />
        );
      })}
    </tbody>
  );
};

export default TableBody;
