import { FC } from "react";
import { SpendingListRow, SpendingsTableProps } from "../utils/types";
import SpendingsRow from "./SpendingsRow";

const SpendingsTable: FC<SpendingsTableProps> = ({ spendings, parentRefetch }) => {
  if (!spendings) {
    return null;
  }

  return (
    <table className="mt-5 overflow-x-auto table-auto w-full">
      <tr className="bg-indigo text-white text-sm font-semibold uppercase">
        <td className="px-2 py-1">Date</td>
        <td className="px-2 py-1">Total</td>
        <td className="px-2 py-1">Actions</td>
      </tr>

      {
        spendings.map((spending: SpendingListRow, idx: number) => {
          return <SpendingsRow key={ idx } spending={spending} parentRefetch={parentRefetch}/>
        })
      }
    </table>
  );
};

export default SpendingsTable;