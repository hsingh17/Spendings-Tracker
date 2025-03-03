import { FC, useEffect, useState } from "react";
import {
  Nullable,
  Sort,
  SortOrder,
  SortType,
  SpendingListRowLineChart,
} from "../../../utils/types";
import SpendingsTableBody from "./SpendingsTableBody";
import SpendingsTableHeader from "./SpendingsTableHeader";
import TableEmptyState from "./TableEmptyState";

type SpendingsTableProps = {
  spendings: Nullable<SpendingListRowLineChart[]>;
  setSpendingToDelete: (spending: SpendingListRowLineChart) => void;
};

// https://www.typescriptlang.org/docs/handbook/2/functions.html#call-signatures
type SortFunc = {
  (
    spendings: SpendingListRowLineChart[],
    sortOrder: SortOrder,
  ): SpendingListRowLineChart[];
};

const SORTERS: Map<SortType, SortFunc> = new Map([
  [
    SortType.DATE,
    (spendings: SpendingListRowLineChart[], sortOrder: SortOrder) => {
      return spendings.sort(
        (a, b) => sortOrder * (a.date.isAfter(b.date) ? 1 : -1),
      );
    },
  ],
  [
    SortType.TOTAL,
    (spendings: SpendingListRowLineChart[], sortOrder: SortOrder) => {
      return spendings.sort((a, b) => -sortOrder * (a.total - b.total));
    },
  ],
]);

const SpendingsTable: FC<SpendingsTableProps> = ({
  spendings,
  setSpendingToDelete,
}) => {
  if (!spendings) {
    return null;
  }

  const [spendingsCopy, setSpendingCopy] =
    useState<SpendingListRowLineChart[]>(spendings);

  const [sort, setSort] = useState<Sort>({
    sortType: SortType.DATE,
    sortOrder: SortOrder.DESC,
  });

  const handleSort = (sortType: SortType) => {
    const sortOrder = getSortOrder(sortType);
    const sortFunc = SORTERS.get(sortType);
    if (!sortFunc) {
      return;
    }

    setSort({ sortType: sortType, sortOrder: sortOrder });
    setSpendingCopy(sortFunc(spendings, sortOrder));
  };

  const getSortOrder = (sortOn: SortType) =>
    sort.sortType === sortOn ? sort.sortOrder * -1 : SortOrder.DESC;

  useEffect(() => {
    setSort({
      sortType: SortType.DATE,
      sortOrder: SortOrder.DESC,
    });
  }, [spendings]);

  if (!spendingsCopy || !spendingsCopy.length) {
    return <TableEmptyState />;
  }

  return (
    <div className="overflow-x-scroll">
      <table className="mt-5 table-fixed w-[750px] md:w-full border-collapse">
        <SpendingsTableHeader handleSort={handleSort} sort={sort} />
        <SpendingsTableBody
          spendings={spendings}
          setSpendingToDelete={setSpendingToDelete}
        />
      </table>
    </div>
  );
};

export default SpendingsTable;
