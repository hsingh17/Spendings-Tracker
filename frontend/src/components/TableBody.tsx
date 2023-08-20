import { FC } from "react";
import { SpendingListRow, TableBodyProps } from "../utils/types";
import TableRow from "./TableRow";

const TableBody: FC<TableBodyProps> = ({
  isLoading,
  spendings,
  parentRefetch,
  parentSetSpendingId
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
            parentSetSpendingId={parentSetSpendingId}
          />
        );
      })}
    </tbody>
  );
};

export default TableBody;
