import { Dayjs } from "dayjs";
import { FC } from "react";
import CustomDayJs from "../../../config/DayJsConfig";
import { DATE_ISO_FORMAT } from "../../../utils/constants";

type SaveSpendingsTitleDateInputProps = {
  date: Dayjs;
  handleDateChange: (date: Dayjs) => void;
};

const SaveSpendingsTitleDateInput: FC<SaveSpendingsTitleDateInputProps> = ({
  date,
  handleDateChange,
}) => {
  const handleChange = (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      value: string;
    };

    // Add the time so when we make API request to backend,
    // it can properly convert the local timezone to UTC
    const time = CustomDayJs().format("THH:mm:ssZ");
    handleDateChange(CustomDayJs(target.value + time));
  };

  return (
    <input
      className="w-fit mr-auto rounded-lg px-2 py-1 text-theme-brand-secondary text-center text-lg -mt-2 -ml-3 md:-mt-8 md:-ml-5 font-semibold mb-7 hover:cursor-pointer"
      type="date"
      id="spending-date"
      defaultValue={date.local().format(DATE_ISO_FORMAT)}
      onChange={(e: React.FormEvent) => handleChange(e)}
    />
  );
};

export default SaveSpendingsTitleDateInput;
