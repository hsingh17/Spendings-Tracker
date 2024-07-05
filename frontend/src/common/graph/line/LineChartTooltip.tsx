import { FC } from "react";
import DateUtils from "../../../utils/date-utils";
import MoneyUtils from "../../../utils/money-utils";
import { Nullable, TooltipPosition } from "../../../utils/types";
import Tooltip from "../../Tooltip";

type LineChartTooltipProps = {
  date: string;
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
      <p className="text-sm">{DateUtils.formatDateUS(date)}</p>
      <p className="font-bold md:text-lg">{MoneyUtils.formatMoneyUsd(total)}</p>
    </Tooltip>
  );
};

export default LineChartTooltip;
