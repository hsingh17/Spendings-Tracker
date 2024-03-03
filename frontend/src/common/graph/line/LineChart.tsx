import { extent, line, scaleLinear, scaleTime, timeParse } from "d3";
import React, { FC, useState } from "react";
import ArrayUtils from "../../../utils/array-utils";
import { ISO_FORMAT } from "../../../utils/constants";
import {
  ApiResponse,
  Nullable,
  SpendingListRow,
  TooltipPosition,
} from "../../../utils/types";
import Line from "./Line";
import LineChartTooltip from "./LineChartTooltip";
import PaginationBar from "./PaginationBar";
import Point from "./Point";
import Tracer from "./Tracer";
import XTicks from "./XTicks";
import YTicks from "./YTicks";

const TRACER_X_INITIAL = -10;
export const POINT_RADIUS = 7;

type LineChartProps = {
  width: number;
  height: number;
  response: ApiResponse<SpendingListRow[]>;
  setSearchParams: (urlSearchParams: URLSearchParams) => void;
};

function calculateMargins(height: number, width: number) {
  return {
    left: width / 15,
    right: width / 15,
    top: height / 5,
    bottom: height / 10,
  };
}

const LineChart: FC<LineChartProps> = ({
  response,
  height,
  width,
  setSearchParams,
}) => {
  const data = response.data;
  const prev = response.metadata?.links.prev;
  const next = response.metadata?.links.next;
  const parser = timeParse(ISO_FORMAT);
  const margins = calculateMargins(height, width);
  const [tracerX, setTracerX] = useState<number>(TRACER_X_INITIAL);
  const [tooltipIdx, setTooltipIdx] = useState<Nullable<number>>(null);
  const [tooltipPosition, setTooltipPosition] =
    useState<Nullable<TooltipPosition>>(null);

  const moveTracerMouse = (e: React.MouseEvent) => {
    moveTracer(e.clientX, e.clientY, e.currentTarget);
  };

  const moveTracerTouch = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    moveTracer(touch.clientX, touch.clientY, e.currentTarget);
  };

  const moveTracer = (
    clientX: number,
    clientY: number,
    currentTarget: EventTarget,
  ) => {
    const domPoint = new DOMPointReadOnly(clientX, clientY);
    const svgNode = currentTarget as SVGGraphicsElement;
    const svgPoint = domPoint.matrixTransform(
      svgNode.getScreenCTM()?.inverse(),
    );
    setTracerX(svgPoint.x);

    // If tracer hovers over a circle then show tooltip
    let pos: Nullable<TooltipPosition> = null;

    let i = 0;
    for (; i < data!.length; i++) {
      const spendingListRow = data![i];
      const d = Math.floor(xScale(parser(spendingListRow.date)!) - svgPoint.x);
      if (Math.abs(d) <= POINT_RADIUS * 3) {
        pos = {
          left: svgPoint.x,
          top: yScale(spendingListRow.total),
        };
        break;
      }
    }

    setTooltipIdx(i == data!.length ? null : i);
    setTooltipPosition(pos);
  };

  const onClickPaginationBar = (e: React.MouseEvent, isLeft: boolean) => {
    const link = isLeft
      ? response.metadata?.links.prev
      : response.metadata?.links.next;

    if (!link) {
      return;
    }

    const queryParams = new URLSearchParams(
      link.substring(link.indexOf("?") + 1),
    );

    setSearchParams(queryParams);
  };

  const xScale = scaleTime()
    .domain(
      extent(data!, (d: SpendingListRow) => parser(d.date)) as [Date, Date],
    )
    .range([margins.left, width - margins.right]);

  const yScale = scaleLinear()
    .domain(extent(data!, (d) => d.total) as [number, number])
    .range([height - margins.top, margins.bottom]);

  const lineFn = line<SpendingListRow>()
    .x((d) => xScale(parser(d.date)!))
    .y((d) => yScale(d.total));

  const d = lineFn(data!);

  // Formula based on width to determine the number of x ticks to show.
  // Display at least 2
  const xTicksToShow = Math.max(
    2,
    Math.floor(xScale.ticks().length * Math.min(width / 2000, 1)),
  );

  const xTicks = ArrayUtils.spreadEvenly<Date>(xScale.ticks(), xTicksToShow);
  const yTicks = yScale.ticks(yScale.ticks().length / 2);

  if (!data) {
    return <>TODO</>;
  }

  return (
    <div className="relative">
      <svg
        height={height}
        width={width}
        onTouchMove={(e: React.TouchEvent) => moveTracerTouch(e)}
        onMouseMove={(e: React.MouseEvent) => moveTracerMouse(e)}
        onMouseLeave={() => setTracerX(TRACER_X_INITIAL)}
      >
        <g>
          <YTicks
            x1={margins.left}
            yScale={yScale}
            x2={width - margins.right}
            yTicks={yTicks}
          />

          <Tracer height={height - margins.top} x={tracerX} />
          <Line d={d} />

          {data!.map((spendingListRow, idx) => (
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

      <LineChartTooltip
        date={tooltipIdx || tooltipIdx === 0 ? data[tooltipIdx].date : ""}
        total={tooltipIdx || tooltipIdx === 0 ? data[tooltipIdx].total : NaN}
        tooltipPosition={tooltipPosition}
      />

      {prev && <PaginationBar isLeft={true} onClick={onClickPaginationBar} />}
      {next && <PaginationBar isLeft={false} onClick={onClickPaginationBar} />}
    </div>
  );
};

export default LineChart;
