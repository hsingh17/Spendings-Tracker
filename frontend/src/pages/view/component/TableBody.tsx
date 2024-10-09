import { FC } from "react";
import Card from "../../../common/Card";
import { ApiResponse, SpendingsPage } from "../../../utils/types";
import SpendingsTable from "./SpendingsTable";
import TableFilter from "./TableFilter";
import TableTitle from "./TableTitle";

type TableBodyProps = {
  response?: ApiResponse<SpendingsPage>;
  resetSearchParams: () => void;
  setSearchParams: (urlSearchParams: URLSearchParams) => void;
  setSpendingId: (spendingIdToDelete: number) => void;
};

const TableBody: FC<TableBodyProps> = ({
  response,
  resetSearchParams,
  setSearchParams,
  setSpendingId,
}) => {
  const timestamp = response?.timestamp;
  const spendings = response?.data?.spendingPage.content;

  return (
    <Card className="p-7">
      <TableTitle />

      <TableFilter
        resetSearchParams={resetSearchParams}
        setSearchParams={setSearchParams}
      />

      <SpendingsTable
        key={timestamp}
        spendings={spendings}
        setSpendingId={setSpendingId}
      />
    </Card>
  );
};

export default TableBody;
