import { interpolateRgb, ScaleBand, ScaleLinear, scaleSequential } from "d3";
import React, { Dispatch, FC, SetStateAction } from "react";
import { Nullable, SpendingListRowBarChart } from "../../../utils/types";
import { ToolTipContent, TooltipInfo } from "./BarChart";

type BarProps = {
  spending: SpendingListRowBarChart;
  barWidth: number;
  height: number;
  xScale: ScaleBand<string>;
  yScale: ScaleLinear<number, number, never>;
  setTooltipInfo: Dispatch<SetStateAction<Nullable<TooltipInfo>>>;
};

const Bar: FC<BarProps> = ({
  spending,
  barWidth,
  height,
  xScale,
  yScale,
  setTooltipInfo,
}) => {
  const zip = Object.entries(spending.categoryTotalMap);
  const x = xScale(spending.date.toString()) || 0;
  const y = yScale(spending.total);
  const interpolator = scaleSequential()
    .interpolator(interpolateRgb("#EEEEEE", "#00ADB5"))
    .domain([0, zip.length]);
  // -20 should be some function
  let lastY = height - 20;

  const onMouseMove = (e: React.MouseEvent<SVGRectElement>) => {
    const contents: ToolTipContent[] = zip.map((val, idx) => {
      return {
        category: val[0],
        total: val[1],
        colorHex: interpolator(idx),
      };
    });

    setTooltipInfo({
      mousePos: {
        mouseX: e.clientX,
        mouseY: e.clientY,
      },
      contents: contents,
    });
  };

  return (
    <g>
      {zip.map((val, idx) => {
        const percentOfTotal = val[1] / spending.total;
        const barHeight = (height - y) * percentOfTotal;
        const barY = lastY - barHeight;
        lastY = barY;

        return (
          <>
            <rect
              key={val[0]}
              className="hover:cursor-pointer animate-[scale-bar-up_1.5s_cubic-bezier(0.25,1,0.5,1)_forwards]"
              style={{
                transformOrigin: "center bottom",
                transform: "scale(1, 0)",
              }}
              onMouseMove={(e: React.MouseEvent<SVGRectElement>) =>
                onMouseMove(e)
              }
              onMouseLeave={() => {}}
              fill={interpolator(idx)}
              width={barWidth}
              x={x}
              y={barY}
              height={barHeight}
            />
          </>
        );
      })}
    </g>
  );
};

export default Bar;
