import { FC } from "react";
import MoneyUtils from "../../utils/money-utils";
import { Nullable, TooltipPosition } from "../../utils/types";
import Tooltip from "../Tooltip";

export type CategoricalChartTooltipProps = {
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
  if (!category || !total) {
    return <></>;
  }

  return (
    <Tooltip
      position={tooltipPosition}
      className="absolute w-fit h-fit bg-theme-neutral text-theme-brand p-2"
      enableDynamicTooltip={enableDynamicTooltip}
    >
      <p className="text-lg md:text-xl font-semibold">{category}</p>
      <p className="font-bold md:text-lg">{MoneyUtils.formatMoney(total)}</p>
    </Tooltip>
  );
};

export default CategoricalChartTooltip;
