import {
  interpolateRgb,
  rgb,
  ScaleBand,
  ScaleLinear,
  scaleSequential,
} from "d3";
import { Dayjs } from "dayjs";
import React, { Dispatch, FC, SetStateAction, useRef } from "react";
import { Nullable, SpendingListRowBarChart } from "../../../utils/types";
import { ToolTipContent, TooltipInfo } from "./BarChart";

type BarProps = {
  spending: SpendingListRowBarChart;
  barWidth: number;
  height: number;
  xScale: ScaleBand<string>;
  yScale: ScaleLinear<number, number, never>;
  currentTooltipDate: Nullable<Dayjs>;
  setTooltipInfo: Dispatch<SetStateAction<Nullable<TooltipInfo>>>;
};

const Bar: FC<BarProps> = ({
  spending,
  barWidth,
  height,
  xScale,
  yScale,
  currentTooltipDate,
  setTooltipInfo,
}) => {
  const textRef = useRef<SVGTextElement>(null);
  const zip = Object.entries(spending.categoryTotalMap);
  const x = xScale(spending.date.toString()) || 0;
  const y = yScale(spending.total);
  const interpolator = scaleSequential()
    .interpolator(interpolateRgb("#EEEEEE", "#00ADB5"))
    .domain([0, zip.length]);
  // -20 should be some function
  let lastY = height - 40;

  const onMouseMove = (e: React.MouseEvent<SVGRectElement>) => {
    const contents: ToolTipContent[] = zip.map((val, idx) => {
      return {
        category: val[0],
        total: val[1],
        colorHex: rgb(interpolator(idx)).formatHex(),
      };
    });

    setTooltipInfo({
      date: spending.date,
      mousePos: {
        mouseX: e.clientX,
        mouseY: e.clientY,
      },
      contents: contents,
    });
  };

  const onMouseLeave = () => {
    if (spending.date === currentTooltipDate) {
      setTooltipInfo(null);
    }
  };

  const calculateTextXPos = () => {
    if (!textRef || !textRef.current) {
      return x;
    }

    const width = textRef.current.getBBox().width;

    return x + (barWidth - width) / 2;
  };

  return (
    <g>
      {zip.map((val, idx) => {
        const percentOfTotal = val[1] / spending.total;
        const barHeight = (height - y) * percentOfTotal;
        const barY = lastY - barHeight;
        lastY = barY;

        return (
          <rect
            className="hover:cursor-pointer animate-[scale-bar-up_1.5s_cubic-bezier(0.25,1,0.5,1)_forwards]"
            style={{
              transformOrigin: "center bottom",
              transform: "scale(1, 0)",
            }}
            onMouseMove={(e: React.MouseEvent<SVGRectElement>) =>
              onMouseMove(e)
            }
            onMouseLeave={() => onMouseLeave()}
            fill={interpolator(idx)}
            width={barWidth}
            x={x}
            y={barY}
            height={barHeight}
          />
        );
      })}

      <text
        x={calculateTextXPos()}
        y={height - 10}
        ref={textRef}
        width={"fit"}
        fill="#EEEEEE"
        style={{ fontWeight: "600" }}
      >
        {spending.date.format("L")}
      </text>
    </g>
  );
};

export default Bar;
