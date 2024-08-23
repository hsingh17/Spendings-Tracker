import { FC } from "react";
import Card from "../../../common/Card";
import { Nullable, SpendingListRow } from "../../../utils/types";
import SpendingsTable from "./SpendingsTable";
import TableFilter from "./TableFilter";
import TableTitle from "./TableTitle";

type TableBodyProps = {
  isLoading: boolean;
  timestamp: Nullable<string>;
  spendings: Nullable<SpendingListRow[]>;
  resetSearchParams: () => void;
  setSearchParams: (urlSearchParams: URLSearchParams) => void;
  setSpendingId: (spendingIdToDelete: number) => void;
};

const DUMMY_SPENDINGS: SpendingListRow[] = Array(25).fill({});

const TableBody: FC<TableBodyProps> = ({
  isLoading,
  timestamp,
  spendings,
  resetSearchParams,
  setSearchParams,
  setSpendingId,
}) => {
  return (
    <Card className="p-7">
      <TableTitle />

      <TableFilter
        isLoading={isLoading}
        resetSearchParams={resetSearchParams}
        setSearchParams={setSearchParams}
      />

      <SpendingsTable
        isLoading={isLoading}
        key={timestamp}
        spendings={isLoading ? DUMMY_SPENDINGS : spendings}
        setSpendingId={setSpendingId}
      />
    </Card>
  );
};

export default TableBody;
