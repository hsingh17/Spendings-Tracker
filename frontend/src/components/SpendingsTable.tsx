import { FC, useEffect, useState } from "react";
import { SpendingListRow, SpendingsTableProps } from "../utils/types";
import SortIcon from "./SortIcon";
import SpendingsRow from "./SpendingsRow";

const enum SortType {
  DATE,
  TOTAL,
}
const enum SortOrder {
  ASC = 1,
  DESC = -1,
}

type Sort = {
  sortOn: SortType;
  sortOrder: SortOrder;
};

const SpendingsTable: FC<SpendingsTableProps> = ({
  spendings,
  parentRefetch,
}) => {
  if (!spendings) {
    return null;
  }

  const [spendingsCopy, setSpendingCopy] =
    useState<Array<SpendingListRow>>(spendings);

  const [sort, setSort] = useState<Sort>({
    sortOn: SortType.DATE,
    sortOrder: SortOrder.DESC,
  });

  const handleSort = (sort: Sort) => {
    let newSpendingsCopy: Array<SpendingListRow> = spendingsCopy;

    if (sort.sortOn === SortType.DATE) {
      newSpendingsCopy = spendingsCopy.sort(
        (a, b) =>
          sort.sortOrder *
          (new Date(a.date).getTime() - new Date(b.date).getTime())
      );
    } else if (sort.sortOn === SortType.TOTAL) {
      newSpendingsCopy = spendingsCopy.sort(
        (a, b) => -sort.sortOrder * (a.total - b.total)
      );
    }

    setSort(sort);
    setSpendingCopy(newSpendingsCopy);
  };

  const getSortOrder = (sortOn: SortType) =>
    sort.sortOn === sortOn ? sort.sortOrder * -1 : SortOrder.DESC;

  return (
    <div className="overflow-x-scroll">
      <table className="mt-5 table-fixed w-[750px] md:w-full overflow-x-scroll">
        <thead>
          <tr className="bg-theme-brand text-theme-neutral text-xs font-bold uppercase w-full">
            <td className="px-2 py-2 w-1/3 md:w-1/6 whitespace-nowrap hover:cursor-pointer">
              <div
                className="flex flex-row items-center"
                onClick={() =>
                  handleSort({
                    sortOn: SortType.DATE,
                    sortOrder: getSortOrder(SortType.DATE),
                  })
                }
              >
                Date
                <SortIcon />
              </div>
            </td>
            <td className="px-2 py-2 w-1/6  hover:cursor-pointer">
              <div
                className="flex flex-row items-center justify-end"
                onClick={() =>
                  handleSort({
                    sortOn: SortType.TOTAL,
                    sortOrder: getSortOrder(SortType.TOTAL),
                  })
                }
              >
                Total
                <SortIcon />
              </div>
            </td>
            <td className="px-2 py-2 text-center hover:cursor-pointer">
              <div className="flex flex-row items-center justify-center">
                Actions
              </div>
            </td>
          </tr>
        </thead>

        <tbody>
          {spendingsCopy.map((spending: SpendingListRow, idx: number) => {
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
