import { CSSProperties, FC, useEffect, useRef, useState } from "react";
import { Granularity } from "../../../enums/Granularity";
import MoneyUtils from "../../../utils/money-utils";
import { TooltipInfo } from "./BarChart";

type BarChartTooltipProps = {
  divStyle: CSSProperties;
  tooltipInfo: TooltipInfo;
};

function isOverflowing(
  styleVal: string,
  divVal: number,
  windowVal: number,
  threshHoldVal: number = 0
): boolean {
  const valNum = parseInt(styleVal, 10);
  return valNum + divVal - windowVal > threshHoldVal;
}

function getTransformStyleVal(
  isOverFlowingX: boolean,
  valX: number,
  isOverFlowingY: boolean,
  valY: number
): string {
  return `translate(${isOverFlowingX ? `-${valX}px` : "0"}, ${isOverFlowingY ? `-${valY}px` : "0"}`;
}

function formatDate(tooltipInfo: TooltipInfo): string {
  const params = new URLSearchParams(window.location.search);
  const granularityStr = params.get("granularity") || "Day";
  const granularity = Granularity[granularityStr as keyof typeof Granularity];
  switch (granularity) {
    case Granularity.Day:
      return tooltipInfo.date.format("L");
    case Granularity.Week:
      return (
        tooltipInfo.date.format("L") +
        " - " +
        tooltipInfo.date.add(6, "day").format("L")
      );
    case Granularity.Month:
      return tooltipInfo.date.format("MMMM YYYY");
    case Granularity.Year:
      return tooltipInfo.date.year().toString();
  }
}

const BarChartTooltip: FC<BarChartTooltipProps> = ({
  tooltipInfo,
  divStyle,
}) => {
  const [style, setStyle] = useState<CSSProperties>(divStyle);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const styleToApply = { ...divStyle };
    // Determines if tooltip should "flip" in the case that rendering it makes it overflow
    if (ref && ref.current) {
      const divHeight = ref.current.clientHeight;
      const divWidth = ref.current.clientWidth;
      const isOverFlowingY = isOverflowing(
        divStyle.top?.toString() || "",
        divHeight,
        window.innerHeight
      );

      const isOverFlowingX = isOverflowing(
        divStyle.left?.toString() || "",
        divWidth,
        window.innerWidth,
        -250
      );

      if (isOverFlowingY || isOverFlowingX) {
        styleToApply.transform = getTransformStyleVal(
          isOverFlowingX,
          divWidth,
          isOverFlowingY,
          divHeight
        );
      } else {
        styleToApply.transform = "";
      }
    }

    setStyle(styleToApply);
  }, [divStyle]);

  return (
    <div
      style={style}
      className="flex flex-col w-fit h-fit p-2 bg-theme-brand-secondary bg-opacity-85 absolute pointer-events-none rounded-md"
      ref={ref}
    >
      <div className="font-bold text-theme-neutral text-lg">
        {formatDate(tooltipInfo)}
      </div>
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
