import React, { Dispatch, FC, SetStateAction } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import DateUtils from "../../utils/date-utils";
import { Nullable } from "../../utils/types";

type GraphDateFilterProps = {
  searchParams: URLSearchParams;
  setSearchParams: Dispatch<SetStateAction<URLSearchParams>>;
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
      <label>Date Range:</label>
      <DatePicker
        range
        rangeHover
        format="MM/DD/YYYY"
        dateSeparator=" to "
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
