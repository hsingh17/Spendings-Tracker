import { FC } from "react";
import { SpendingsForADay, SpendingsTableProps } from "../utils/types";
import SpendingsRow from "./SpendingsRow";

const SpendingsContainer: FC<SpendingsTableProps> = ({ spendingsForADayList }) => {
  return (
    <table>
      <tr>
        <td>Date</td>
        <td>Amount</td>
        <td>Buttons</td>
      </tr>

      {
        spendingsForADayList.map((spendingsForADay: SpendingsForADay, idx: number) => {
          return <SpendingsRow key={ idx } spendingsForADay={ spendingsForADay } />
        })
      }
    </table>
  );
};

export default SpendingsContainer;