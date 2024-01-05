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
import { Nullable, SpendingListRow } from "../../utils/types";
import GraphTooltip from "./GraphTooltip";
import DateUtils from "../../utils/date-utils";
import MoneyUtils from "../../utils/money-utils";

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
const POINT_RADIUS = 7;

const LineChart: FC<LineChartProps> = ({ data, height, width }) => {
  const parser = timeParse(Constants.ISO_FORMAT);
  const margins = calculateMargins(height, width);
  const isMobile = useDetectMobile();
  const [tracerX, setTracerX] = useState<number>(TRACER_X_INITIAL);
  const [tooltipDate, setTooltipDate] = useState<Nullable<string>>(null);

  const moveTracer = (e: React.MouseEvent) => {
    const domPoint = new DOMPointReadOnly(e.clientX, e.clientY);
    const svgNode: SVGGraphicsElement = e.currentTarget as SVGGraphicsElement;
    const svgPoint = domPoint.matrixTransform(
      svgNode.getScreenCTM()?.inverse()
    );
    setTracerX(svgPoint.x);
    
    // If tracer hovers over a circle then show tooltip
    let date: Nullable<string> = null;
    data.forEach((spendingListRow) => {
      const d = Math.floor(xScale(parser(spendingListRow.date)!) - svgPoint.x);
      if (Math.abs(d) <= POINT_RADIUS) {
        date = spendingListRow.date;
      } 
    });

    setTooltipDate(date);
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
            <g className="relative" key={spendingListRow.date}>
              <circle
                key={spendingListRow.date}
                className="hover:cursor-pointer"
                onMouseOver={() => setTooltipDate(spendingListRow.date)}
                onMouseLeave={() => setTooltipDate(null)}
                fill="white"
                stroke="#374151"
                strokeWidth={5}
                cx={xScale(parser(spendingListRow.date)!)}
                cy={yScale(spendingListRow.total)}
                r={POINT_RADIUS}
              />

              {tooltipDate === spendingListRow.date && (
                <GraphTooltip
                  w={100}
                  h={100}
                  x={xScale(parser(spendingListRow.date)!)}
                  y={yScale(spendingListRow.total) - 50}
                >
                  <text
                    x={xScale(parser(spendingListRow.date)!)}
                    y={yScale(spendingListRow.total)}
                    className="font-semibold text-white"
                  >
                    <tspan x={xScale(parser(spendingListRow.date)!)}>
                      Date: {DateUtils.formatDateUS(spendingListRow.date)}
                    </tspan>
                    <tspan x={xScale(parser(spendingListRow.date)!)} dy={20}>
                      Amount: {MoneyUtils.formatMoneyUsd(spendingListRow.total)}
                    </tspan>
                  </text>
                </GraphTooltip>
              )}
            </g>
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
      </g>
    </svg>
  );
};

export default LineChart;
