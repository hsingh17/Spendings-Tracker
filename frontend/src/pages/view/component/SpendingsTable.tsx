import { FC, useEffect, useState } from "react";
import {
  Nullable,
  Sort,
  SortOrder,
  SortType,
  SpendingListRow,
} from "../../../utils/types";
import SpendingsTableBody from "./SpendingsTableBody";
import SpendingsTableHeader from "./SpendingsTableHeader";
import TableEmptyState from "./TableEmptyState";

type SpendingsTableProps = {
  spendings: Nullable<SpendingListRow[]>;
  setSpendingId: (spendingId: number) => void;
};

// https://www.typescriptlang.org/docs/handbook/2/functions.html#call-signatures
type SortFunc = {
  (spendings: SpendingListRow[], sortOrder: SortOrder): SpendingListRow[];
};

const SORTERS: Map<SortType, SortFunc> = new Map([
  [
    SortType.DATE,
    (spendings: SpendingListRow[], sortOrder: SortOrder) => {
      return spendings.sort(
        (a, b) =>
          sortOrder * (new Date(a.date).getTime() - new Date(b.date).getTime()),
      );
    },
  ],
  [
    SortType.TOTAL,
    (spendings: SpendingListRow[], sortOrder: SortOrder) => {
      return spendings.sort((a, b) => -sortOrder * (a.total - b.total));
    },
  ],
]);

const SpendingsTable: FC<SpendingsTableProps> = ({
  spendings,
  setSpendingId,
}) => {
  if (!spendings) {
    return null;
  }

  const [spendingsCopy, setSpendingCopy] =
    useState<SpendingListRow[]>(spendings);

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
          setSpendingId={setSpendingId}
        />
      </table>
    </div>
  );
};

export default SpendingsTable;
