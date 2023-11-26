import { FC, useEffect, useState } from "react";
import {
  Sort,
  SortOrder,
  SortType,
  SpendingListRow,
  SpendingsTableProps,
} from "../../../utils/types";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import TableEmptyState from "./TableEmptyState";

const SpendingsTable: FC<SpendingsTableProps> = ({
  isLoading,
  spendings,
  parentRefetch,
  parentSetSpendingId,
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

  useEffect(() => {
    setSort({
      sortType: SortType.DATE,
      sortOrder: SortOrder.DESC,
    });
  }, [spendings]);

  if (spendingsCopy.length === 0) {
    return <TableEmptyState />;
  }

  return (
    <div className="overflow-x-scroll">
      <table className="mt-5 table-fixed w-[750px] md:w-full border-collapse">
        <TableHeader parentHandleSort={handleSort} sort={sort} />
        <TableBody
          isLoading={isLoading}
          spendings={spendings}
          parentRefetch={parentRefetch}
          parentSetSpendingId={parentSetSpendingId}
        />
      </table>
    </div>
  );
};

export default SpendingsTable;
