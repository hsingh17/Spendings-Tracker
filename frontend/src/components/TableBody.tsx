import { FC } from "react";
import { SpendingListRow, TableBodyProps } from "../utils/types";
import TableRow from "./TableRow";

const TableBody: FC<TableBodyProps> = ({ parentRefetch, spendings }) => {
  return (
    <tbody>
      {spendings.map((spending: SpendingListRow, idx: number) => {
        return (
          <TableRow
            key={idx}
            spending={spending}
            parentRefetch={parentRefetch}
          />
        );
      })}
    </tbody>
  );
};

export default TableBody;
