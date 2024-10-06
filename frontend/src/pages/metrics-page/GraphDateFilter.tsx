import dayjs, { Dayjs } from "dayjs";
import { FC } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import CustomDayJs from "../../config/DayJsConfig";

type GraphDateFilterProps = {
  searchParams: URLSearchParams;
  setSearchParams: (urlSearchParams: URLSearchParams) => void;
};

const GraphDateFilter: FC<GraphDateFilterProps> = ({
  searchParams,
  setSearchParams,
}) => {
  const startDate: Dayjs = CustomDayJs(searchParams.get("start-date"));
  const endDate: Dayjs = CustomDayJs(searchParams.get("end-date"));

  const onChange = (dates: DateObject[]) => {
    if (dates.length != 2) {
      return; // No-op if we don't have two dates selected
    }

    const startDate = dates[0].format("YYYY-MM-DD");
    const endDate = dates[1].format("YYYY-MM-DD");

    searchParams.set("start-date", startDate);
    searchParams.set("end-date", endDate);

    setSearchParams(searchParams);
  };

  return (
    <>
      <label className="text-sm font-semibold mb-1">Date Range</label>
      <DatePicker
        range
        rangeHover
        inputClass="p-2 mb-2 w-full rounded-lg border-slate border-2 text-wrap bg-gray-200"
        format={dayjs.Ls.en.formats.L} // Use dayjs to get local date format string
        dateSeparator=" - "
        onChange={onChange}
        calendarPosition="bottom-center"
        value={[startDate.toDate(), endDate.toDate()]}
      />
    </>
  );
};

export default GraphDateFilter;
