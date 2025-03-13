import { CSSProperties, FC, useEffect, useRef, useState } from "react";
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
  const [style, setStyle] = useState<CSSProperties>(divStyle);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const styleToApply = { ...divStyle };
    // Determines if tooltip should "flip" in the case that rendering it makes it overflow
    if (ref && ref.current) {
      const divHeight = ref.current.clientHeight;
      const styleTop = divStyle.top?.toString() || "";
      const top = parseInt(styleTop, 10);
      const overflowAmnt = top + divHeight - window.innerHeight;

      if (overflowAmnt > 0) {
        styleToApply.transform = `translate(0, -${divHeight}px)`;
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
