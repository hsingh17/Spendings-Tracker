import { FC } from "react";
import MoneyUtils from "../../utils/money-utils";
import { Nullable, TooltipPosition } from "../../utils/types";
import Tooltip from "./Tooltip";

type CategoricalChartTooltipProps = {
  category: string;
  total: number;
  tooltipPosition: Nullable<TooltipPosition>;
  enableDynamicTooltip?: boolean;
};

const CategoricalChartTooltip: FC<CategoricalChartTooltipProps> = ({
  category,
  tooltipPosition,
  total,
  enableDynamicTooltip = true,
}) => {
  if (!tooltipPosition || !category || !total) {
    return <></>;
  }

  return (
    <Tooltip
      position={tooltipPosition}
      className="w-fit h-fit bg-theme-neutral text-theme-brand p-2"
      enableDynamicTooltip={enableDynamicTooltip}
    >
      <p className="text-lg md:text-xl font-semibold">{category}</p>
      <p className="font-bold md:text-lg">{MoneyUtils.formatMoneyUsd(total)}</p>
    </Tooltip>
  );
};

export default CategoricalChartTooltip;
