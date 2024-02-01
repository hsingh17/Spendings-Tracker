import React, { Dispatch, FC, SetStateAction } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";

type GraphDateFilterProps = {
  setSearchParams: Dispatch<SetStateAction<URLSearchParams>>;
};

const GraphDateFilter: FC<GraphDateFilterProps> = ({ setSearchParams }) => {
  const onChange = (dates: DateObject[]) => {
    if (dates.length != 2) {
      return; // No-op if we don't have two dates selected
    }

    const startDate = dates[0].format("YYYY-MM-DD");
    const endDate = dates[1].format("YYYY-MM-DD");

    // TODO
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
      />
    </>
  );
};

export default GraphDateFilter;
