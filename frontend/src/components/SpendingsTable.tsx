import { FC } from "react";
import { SpendingUserAggr, SpendingsTableProps } from "../utils/types";
import SpendingsRow from "./SpendingsRow";

const SpendingsTable: FC<SpendingsTableProps> = ({ spendingUserAggrList, toggleRefresh }) => {
  return (
    <table>
      <tr>
        <td>Date</td>
        <td>Amount</td>
        <td>Buttons</td>
      </tr>

      {
        spendingUserAggrList.map((spendingUserAggr: SpendingUserAggr, idx: number) => {
          return <SpendingsRow key={ idx } spendingUserAggr={ spendingUserAggr } toggleRefresh={ toggleRefresh }/>
        })
      }
    </table>
  );
};

export default SpendingsTable;