import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import utc from "dayjs/plugin/utc";

// Configure custom app dayjs properties
const CustomDayJs = dayjs;
CustomDayJs.extend(utc);
CustomDayJs.extend(LocalizedFormat);

export default CustomDayJs;
