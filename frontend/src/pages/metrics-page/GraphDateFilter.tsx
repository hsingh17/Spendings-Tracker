import React, { Dispatch, FC, SetStateAction } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import DateUtils from "../../utils/date-utils";
import { Nullable } from "../../utils/types";

type GraphDateFilterProps = {
  searchParams: URLSearchParams;
  setSearchParams: (urlSearchParams: URLSearchParams) => void;
};

const GraphDateFilter: FC<GraphDateFilterProps> = ({
  searchParams,
  setSearchParams,
}) => {
  const spStartDate: Nullable<string> = DateUtils.formatDateUS(
    searchParams.get("start-date")
  );
  const spEndDate: Nullable<string> = DateUtils.formatDateUS(
    searchParams.get("end-date")
  );

  const startDateObj: Nullable<Date> =
    spStartDate !== null && spStartDate !== undefined
      ? new Date(spStartDate)
      : null;

  const endDateObj: Nullable<Date> =
    spEndDate !== null && spEndDate !== undefined ? new Date(spEndDate) : null;

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
        format="MM/DD/YYYY"
        dateSeparator=" - "
        onChange={onChange}
        calendarPosition="bottom-center"
        value={
          startDateObj === null || endDateObj === null
            ? []
            : [startDateObj, endDateObj]
        }
      />
    </>
  );
};

export default GraphDateFilter;
