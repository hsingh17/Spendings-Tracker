import { FC } from "react";
import DateUtils from "../../../utils/date-utils";
import MoneyUtils from "../../../utils/money-utils";
import { Nullable } from "../../../utils/types";
import { TooltipPosition } from "./LineChart";

type TooltipProps = {
  tooltipPosition: Nullable<TooltipPosition>;
  date: string;
  total: number;
};

const Tooltip: FC<TooltipProps> = ({ tooltipPosition, date, total }) => {
  if (!tooltipPosition) {
    return <></>;
  }

  return (
    <div
      className={"absolute w-fit h-fit bg-theme-cta text-white p-2 rounded-xl"}
      style={{
        display: tooltipPosition ? "block" : "none",
        top: tooltipPosition.top,
        left: tooltipPosition.left,
      }}
    >
      <p className="text-sm">{DateUtils.formatDateUS(date)}</p>
      <p className="font-bold md:text-lg">{MoneyUtils.formatMoneyUsd(total)}</p>
    </div>
  );
};

export default Tooltip;
