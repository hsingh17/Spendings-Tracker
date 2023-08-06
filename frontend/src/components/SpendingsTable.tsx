import { FC } from "react";
import { SpendingListRow, SpendingsTableProps } from "../utils/types";
import SpendingsRow from "./SpendingsRow";

const SpendingsTable: FC<SpendingsTableProps> = ({
  spendings,
  parentRefetch,
}) => {
  if (!spendings) {
    return null;
  }

  return (
    <div className="overflow-x-scroll">
      <table className="mt-5 table-fixed w-[750px] md:w-full overflow-x-scroll">
        <thead>
          <tr className="bg-theme-brand text-theme-neutral text-xs font-bold uppercase">
            <td className="px-2 py-2 w-1/3 md:w-1/6 whitespace-nowrap">Date</td>
            <td className="px-2 py-2 w-1/6 text-right">Total</td>
            <td className="px-2 py-2 text-center">Actions</td>
          </tr>
        </thead>

        <tbody>
          {spendings.map((spending: SpendingListRow, idx: number) => {
            return (
              <SpendingsRow
                key={idx}
                spending={spending}
                parentRefetch={parentRefetch}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SpendingsTable;
