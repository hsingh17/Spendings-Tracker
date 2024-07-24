import { FC } from "react";
import { Spending } from "../../../utils/types";
import SaveSpendingsTitleDateInput from "./SaveSpendingsTitleDateInput";
import SaveSpendingsTitleTotal from "./SaveSpendingsTitleTotal";

type SaveSpendingsTitleProps = {
  date: string;
  spendings: Spending[];
  handleDateChange: (date: string) => void;
};

const SaveSpendingsTitle: FC<SaveSpendingsTitleProps> = ({
  date,
  spendings,
  handleDateChange,
}) => {
  return (
    <div className="w-full p-5 -mb-4 flex flex-col justify-center items-center">
      <SaveSpendingsTitleTotal spendings={spendings} />
      <SaveSpendingsTitleDateInput
        date={date}
        handleDateChange={handleDateChange}
      />
    </div>
  );
};

export default SaveSpendingsTitle;
