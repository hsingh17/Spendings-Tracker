import { CSSProperties, FC } from "react";
import MoneyUtils from "../../../utils/money-utils";
import { TooltipInfo } from "./BarChart";

type BarChartTooltipProps = {
  divStyle: CSSProperties;
  tooltipInfo: TooltipInfo;
};

const BarChartTooltip: FC<BarChartTooltipProps> = ({
  tooltipInfo,
  divStyle,
}) => {
  // TODO: Need it to flip if near bottom of screen
  return (
    <div
      style={divStyle}
      className="flex flex-col w-fit h-fit p-2 bg-theme-brand-secondary bg-opacity-85 absolute pointer-events-none rounded-md"
    >
      {tooltipInfo.contents.toReversed().map((val, idx) => {
        return (
          <div className="flex flex-row items-center" key={val.category + idx}>
            <div
              className="w-4 h-4 m-2"
              style={{ backgroundColor: val.colorHex }}
            ></div>
            <div className="text-theme-neutral mb-[0.5px] mr-10">
              {`${val.category}:`}
            </div>
            <div className="text-theme-neutral mb-[0.5px] ml-auto font-semibold">
              {`${MoneyUtils.formatMoney(val.total)}`}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BarChartTooltip;
