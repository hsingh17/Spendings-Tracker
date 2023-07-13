import { FC } from "react";
import { SpendingListRow, SpendingsTableProps } from "../utils/types";
import SpendingsRow from "./SpendingsRow";

const SpendingsTable: FC<SpendingsTableProps> = ({ spendings, parentRefetch }) => {
  if (!spendings) {
    return null;
  }

  return (
    <table>
      <tr>
        <td>Date</td>
        <td>Total</td>
        <td>Buttons</td>
      </tr>

      {
        spendings.map((spending: SpendingListRow, idx: number) => {
          return <SpendingsRow key={ idx } spending={spending} parentRefetch={parentRefetch}/>
        })
      }
    </table>
  );
};

export default SpendingsTable;