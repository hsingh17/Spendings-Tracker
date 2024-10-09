import { Dayjs } from "dayjs";
import { FC } from "react";
import { Spending } from "../../../utils/types";
import SaveSpendingsTitleDateInput from "./SaveSpendingsTitleDateInput";
import SaveSpendingsTitleTotal from "./SaveSpendingsTitleTotal";

type SaveSpendingsTitleProps = {
  date: Dayjs;
  spendings: Spending[];
  handleDateChange: (date: Dayjs) => void;
};

const SaveSpendingsTitle: FC<SaveSpendingsTitleProps> = ({
  date,
  spendings,
  handleDateChange,
}) => {
  return (
    <div className="w-full p-5 -mb-4 flex flex-col justify-center items-center">
      <SaveSpendingsTitleDateInput
        date={date}
        handleDateChange={handleDateChange}
      />
      <SaveSpendingsTitleTotal spendings={spendings} />
    </div>
  );
};

export default SaveSpendingsTitle;
