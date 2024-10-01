import { Nullable } from "./types";

const DateUtils = {
  localDateFromString(date: Nullable<string | Date>): Date {
    return !date ? this.getCurrentDate() : new Date(date);
  },

  formatDateToRFC3339(date: Date): string {
    function padToTwoDigits(n: number): string {
      return n < 10 ? `0${n}` : n.toString();
    }

    return `${date.getFullYear()}-${padToTwoDigits(date.getMonth() + 1)}-${padToTwoDigits(date.getDate())}`;
  },

  getUTCDateAsRFC3339(date: Nullable<Date>): string {
    const dateStr = !date
      ? this.getCurrentDate().toISOString()
      : date.toISOString();
    return dateStr.split("T")[0];
  },

  getCurrentDate(): Date {
    return new Date(new Date().toLocaleString());
  },

  getCurrentDateAsRFC3339(): string {
    return this.formatDateToRFC3339(this.getCurrentDate());
  },
};

export default DateUtils;
