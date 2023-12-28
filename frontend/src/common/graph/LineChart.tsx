import {
  extent,
  line,
  scaleLinear,
  scaleTime,
  timeFormat,
  timeParse,
} from "d3";
import React, { FC, useState } from "react";
import useDetectMobile from "../../hooks/useDetectMobile";
import { Constants } from "../../utils/constants";
import { SpendingListRow } from "../../utils/types";

type LineChartProps = {
  width: number;
  height: number;
  data: SpendingListRow[];
};

function calculateMargins(height: number, width: number) {
  return {
    left: width / 20,
    right: width / 20,
    top: height / 5,
    bottom: height / 20,
  };
}

const TRACER_X_INITIAL = -10;

const LineChart: FC<LineChartProps> = ({ data, height, width }) => {
  const parser = timeParse(Constants.ISO_FORMAT);
  const margins = calculateMargins(height, width);
  const isMobile = useDetectMobile();
  const [tracerX, setTracerX] = useState<number>(TRACER_X_INITIAL);

  const moveTracer = (e: React.MouseEvent) => {
    const domPoint = new DOMPointReadOnly(e.clientX, e.clientY);
    const svgNode: SVGGraphicsElement = e.currentTarget as SVGGraphicsElement;
    const svgPoint = domPoint.matrixTransform(
      svgNode.getScreenCTM()?.inverse()
    );
    setTracerX(svgPoint.x);
  };

  const xScale = scaleTime()
    .domain(
      extent(data, (d: SpendingListRow) => parser(d.date)) as [Date, Date]
    )
    .range([margins.left, width - margins.right]);

  const yScale = scaleLinear()
    .domain(extent(data, (d) => d.total) as [number, number])
    .range([height - margins.top, margins.bottom]);

  const lineFn = line<SpendingListRow>()
    .x((d) => xScale(parser(d.date)!))
    .y((d) => yScale(d.total));

  const d = lineFn(data);

  const xAxisFormatter = timeFormat("%m/%Y");

  const xTicks = isMobile
    ? xScale.ticks(Math.floor(xScale.ticks().length / 3))
    : xScale.ticks(Math.floor(xScale.ticks().length / 2));

  const yTicks = yScale.ticks(yScale.ticks().length / 2);

  return (
    <svg
      height={height}
      width={width}
      onMouseMove={(e: React.MouseEvent) => moveTracer(e)}
      onMouseLeave={() => setTracerX(TRACER_X_INITIAL)}
    >
      <g>
        <rect width={2} height={height - margins.top} x={tracerX} fill="gray" />
        <path
          className="animate-[linechart_1.5s_cubic-bezier(1,0,0,1)_forwards]"
          d={d ? d : ""}
          fill="none"
          stroke="#00ADB5"
          strokeWidth={2}
          strokeDasharray={"10000"}
          strokeDashoffset={-10000}
        />

        {data.map((spendingListRow) => {
          return (
            <circle
              key={spendingListRow.date}
              className="hover:cursor-pointer"
              fill="white"
              stroke="#374151"
              strokeWidth={5}
              cx={xScale(parser(spendingListRow.date)!)}
              cy={yScale(spendingListRow.total)}
              r={6}
            />
          );
        })}

        {xTicks.map((date) => {
          return (
            <text
              key={date.toDateString()}
              className="font-semibold"
              fill="#EEEEEE"
              x={xScale(date)}
              y={height - margins.bottom}
            >
              {xAxisFormatter(date)}
            </text>
          );
        })}

        {yTicks.map((value) => {
          return (
            <line
              key={value}
              x1={margins.left}
              x2={width - margins.right}
              y1={yScale(value)}
              y2={yScale(value)}
              stroke="gray"
              strokeDasharray={"1,7"}
              strokeLinecap="round"
            />
          );
        })}
      </g>
    </svg>
  );
};

export default LineChart;
