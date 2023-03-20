import { FC } from "react";
import { SpendingsForADay, SpendingsTableProps } from "../utils/types";
import SpendingsRow from "./SpendingsRow";

const SpendingsContainer: FC<SpendingsTableProps> = ({ spendingsForADayList }) => {
  return (
    <div>
      <div>
        <h2 className="text-3xl underline bg-violet-200">Date</h2>
        <h2>Amount</h2>
        <h2>Buttons</h2>
      </div>

      {
        spendingsForADayList.map((spendingsForADay: SpendingsForADay, idx: number) => {
          return <SpendingsRow key={ idx } spendingForADay={ spendingsForADay } />
        })
      }
    </div>
  );
};

export default SpendingsContainer;