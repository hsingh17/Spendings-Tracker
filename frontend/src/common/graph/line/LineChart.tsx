import {
  ScaleLinear,
  ScaleTime,
  extent,
  line,
  scaleLinear,
  scaleTime,
  timeFormat,
  timeParse,
} from "d3";
import React, { FC, useState } from "react";
import useDetectMobile from "../../../hooks/useDetectMobile";
import { Constants } from "../../../utils/constants";
import { Nullable, SpendingListRow } from "../../../utils/types";
import DateUtils from "../../../utils/date-utils";
import MoneyUtils from "../../../utils/money-utils";

const TRACER_X_INITIAL = -10;
const POINT_RADIUS = 7;

function calculateMargins(height: number, width: number) {
  return {
    left: width / 20,
    right: width / 20,
    top: height / 5,
    bottom: height / 20,
  };
}

type YTicksProps = {
  yTicks: number[];
  x1: number;
  x2: number;
  yScale: ScaleLinear<number, number, never>;
};

const YTicks: FC<YTicksProps> = ({ x1, x2, yScale, yTicks }) => {
  return (
    <>
      {yTicks.map((value) => {
        return (
          <line
            key={value}
            x1={x1}
            x2={x2}
            y1={yScale(value)}
            y2={yScale(value)}
            stroke="gray"
            strokeDasharray={"1,7"}
            strokeLinecap="round"
          />
        );
      })}
    </>
  );
};

type TracerProps = {
  height: number;
  x: number;
};

const Tracer: FC<TracerProps> = ({ height, x }) => {
  return <rect width={2} height={height} x={x} fill="gray" />;
};

type LineProps = {
  d: Nullable<string>;
};

const Line: FC<LineProps> = ({ d }) => {
  if (!d) {
    return <></>;
  }

  return (
    <path
      className="animate-[linechart_1.5s_cubic-bezier(1,0,0,1)_forwards]"
      d={d}
      fill="none"
      stroke="#00ADB5"
      strokeWidth={2}
      strokeDasharray={"10000"}
      strokeDashoffset={-10000}
    />
  );
};

type PointProps = {
  idx: number;
  spendingListRow: SpendingListRow;
  setTooltipIdx: (date: Nullable<number>) => void;
  xScale: ScaleTime<number, number, never>;
  yScale: ScaleLinear<number, number, never>;
};

const Point: FC<PointProps> = ({
  idx,
  setTooltipIdx,
  spendingListRow,
  xScale,
  yScale,
}) => {
  const parser = timeParse(Constants.ISO_FORMAT);
  return (
    <circle
      key={spendingListRow.date}
      className="hover:cursor-pointer"
      onMouseOver={() => setTooltipIdx(idx)}
      onMouseLeave={() => setTooltipIdx(null)}
      fill="white"
      stroke="#374151"
      strokeWidth={5}
      cx={xScale(parser(spendingListRow.date)!)}
      cy={yScale(spendingListRow.total)}
      r={POINT_RADIUS}
    />
  );
};

type XTicksProps = {
  xTicks: Date[];
  xScale: ScaleTime<number, number, never>;
  y: number;
};

const XTicks: FC<XTicksProps> = ({ xTicks, xScale, y }) => {
  const xAxisFormatter = timeFormat("%m/%Y");
  return (
    <>
      {xTicks.map((date) => {
        return (
          <text
            key={date.toDateString()}
            className="font-semibold"
            fill="#EEEEEE"
            x={xScale(date)}
            y={y}
          >
            {xAxisFormatter(date)}
          </text>
        );
      })}
    </>
  );
};

type TooltipPosition = {
  top: number;
  left: number;
};

type LineChartProps = {
  width: number;
  height: number;
  data: SpendingListRow[];
};

const LineChart: FC<LineChartProps> = ({ data, height, width }) => {
  const parser = timeParse(Constants.ISO_FORMAT);
  const margins = calculateMargins(height, width);
  const isMobile = useDetectMobile();
  const [tracerX, setTracerX] = useState<number>(TRACER_X_INITIAL);
  const [tooltipIdx, setTooltipIdx] = useState<Nullable<number>>(null);
  const [tooltipPosition, setTooltipPosition] =
    useState<Nullable<TooltipPosition>>(null);

  const moveTracer = (e: React.MouseEvent) => {
    const domPoint = new DOMPointReadOnly(e.clientX, e.clientY);
    const svgNode: SVGGraphicsElement = e.currentTarget as SVGGraphicsElement;
    const svgPoint = domPoint.matrixTransform(
      svgNode.getScreenCTM()?.inverse()
    );
    setTracerX(svgPoint.x);

    // If tracer hovers over a circle then show tooltip
    let date: Nullable<string> = null;
    let pos: Nullable<TooltipPosition> = null;

    let i = 0;
    for (; i < data.length; i++) {
      const spendingListRow = data[i];
      const d = Math.floor(xScale(parser(spendingListRow.date)!) - svgPoint.x);
      if (Math.abs(d) <= POINT_RADIUS * 2) {
        pos = {
          left: svgPoint.x,
          top: yScale(spendingListRow.total),
        };
        break;
      }
    }

    setTooltipIdx(i == data.length ? null : i);
    setTooltipPosition(pos);
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

  const xTicks = isMobile
    ? xScale.ticks(Math.floor(xScale.ticks().length / 3))
    : xScale.ticks(Math.floor(xScale.ticks().length / 2));

  const yTicks = yScale.ticks(yScale.ticks().length / 2);

  return (
    <div className="relative">
      <svg
        height={height}
        width={width}
        onMouseMove={(e: React.MouseEvent) => moveTracer(e)}
        onMouseLeave={() => setTracerX(TRACER_X_INITIAL)}
      >
        <g>
          <YTicks
            x1={margins.left}
            x2={width - margins.right}
            yScale={yScale}
            yTicks={yTicks}
          />

          <Tracer height={height - margins.top} x={tracerX} />
          <Line d={d} />

          {data.map((spendingListRow, idx) => (
            <Point
              idx={idx}
              key={spendingListRow.date}
              spendingListRow={spendingListRow}
              setTooltipIdx={setTooltipIdx}
              xScale={xScale}
              yScale={yScale}
            />
          ))}

          <XTicks xScale={xScale} xTicks={xTicks} y={height - margins.bottom} />
        </g>
      </svg>

      {tooltipIdx !== null && tooltipIdx !== undefined && (
        <div
          className={
            "absolute w-fit h-fit bg-theme-cta text-white p-2 rounded-xl"
          }
          style={{
            display: tooltipPosition ? "block" : "none",
            top: tooltipPosition?.top,
            left: tooltipPosition?.left,
          }}
        >
          <p className="text-sm">
            {DateUtils.formatDateUS(data[tooltipIdx].date)}
          </p>
          <p className="font-bold md:text-lg">
            {MoneyUtils.formatMoneyUsd(data[tooltipIdx].total)}
          </p>
        </div>
      )}
    </div>
  );
};

export default LineChart;
