import { FC, useState } from "react";
import {
  SpendingListRow,
  SpendingsTableProps,
  Sort,
  SortType,
  SortOrder,
} from "../utils/types";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

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
    sortType: SortType.DATE,
    sortOrder: SortOrder.DESC,
  });

  const handleSort = (sortType: SortType) => {
    let newSpendingsCopy: Array<SpendingListRow> = spendingsCopy;
    const sortOrder: SortOrder = getSortOrder(sortType);

    if (sortType === SortType.DATE) {
      newSpendingsCopy = spendingsCopy.sort(
        (a, b) =>
          sortOrder * (new Date(a.date).getTime() - new Date(b.date).getTime())
      );
    } else if (sortType === SortType.TOTAL) {
      newSpendingsCopy = spendingsCopy.sort(
        (a, b) => -sortOrder * (a.total - b.total)
      );
    }

    setSort({ sortType: sortType, sortOrder: sortOrder });
    setSpendingCopy(newSpendingsCopy);
  };

  const getSortOrder = (sortOn: SortType) =>
    sort.sortType === sortOn ? sort.sortOrder * -1 : SortOrder.DESC;

  return (
    <div className="overflow-x-scroll">
      <table className="mt-5 table-fixed w-[750px] md:w-full overflow-x-scroll">
        <TableHeader parentHandleSort={handleSort} sort={sort} />
        <TableBody parentRefetch={parentRefetch} spendings={spendings} />
      </table>
    </div>
  );
};

export default SpendingsTable;
