import { FC } from "react";
import Card from "../../../common/Card";
import {
  ApiResponse,
  SpendingListRowLineChart,
  SpendingsPage,
} from "../../../utils/types";
import SpendingsTable from "./SpendingsTable";
import TableFilter from "./TableFilter";
import TableTitle from "./TableTitle";

type TableBodyProps = {
  response?: ApiResponse<SpendingsPage>;
  resetSearchParams: () => void;
  setSearchParams: (urlSearchParams: URLSearchParams) => void;
  setSpendingToDelete: (spending: SpendingListRowLineChart) => void;
};

const TableBody: FC<TableBodyProps> = ({
  response,
  resetSearchParams,
  setSearchParams,
  setSpendingToDelete,
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
        setSpendingToDelete={setSpendingToDelete}
      />
    </Card>
  );
};

export default TableBody;
