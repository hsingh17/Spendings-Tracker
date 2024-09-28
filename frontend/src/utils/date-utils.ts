import { Nullable } from "./types";

const DateUtils = {
  formatDateUS(date: Nullable<Date>): Nullable<Date> {
    if (!date) {
      return null;
    }

    // Can't pass date string into the Date object since JS will convert to UTC
    const split = date.split("-");
    const yearNum = parseInt(split[0]);
    const monthIdx = parseInt(split[1]) - 1;
    const dateNum = parseInt(split[2]);

    const dateObj: Date = new Date(yearNum, monthIdx, dateNum);
    if (isNaN(dateObj.getTime())) {
      // NaN check
      return null;
    }

    const monthRaw: number = dateObj.getMonth() + 1;
    const month: string = monthRaw < 10 ? `0${monthRaw}` : `${monthRaw}`;

    const dayRaw: number = dateObj.getDate();
    const day: string = dayRaw < 10 ? `0${dayRaw}` : `${dayRaw}`;

    return `${month}/${day}/${dateObj.getFullYear()}`;
  },

  getCurrentDate(): string {
    return new Date().toISOString().split("T")[0];
  },
};

export default DateUtils;
