import { Dayjs } from "dayjs";
import { FC } from "react";
import MoneyUtils from "../../../utils/money-utils";
import { Nullable, TooltipPosition } from "../../../utils/types";
import Tooltip from "../../Tooltip";

type LineChartTooltipProps = {
  date: Nullable<Dayjs>;
  total: number;
  tooltipPosition: Nullable<TooltipPosition>;
};

const LineChartTooltip: FC<LineChartTooltipProps> = ({
  date,
  tooltipPosition,
  total,
}) => {
  if (!date || !total) {
    return <></>;
  }

  return (
    <Tooltip
      position={tooltipPosition}
      className="absolute w-fit h-fit bg-theme-cta text-white p-2 rounded-xl"
    >
      <p className="text-sm">{date.format("L")}</p>
      <p className="font-bold md:text-lg">{MoneyUtils.formatMoney(total)}</p>
    </Tooltip>
  );
};

export default LineChartTooltip;
