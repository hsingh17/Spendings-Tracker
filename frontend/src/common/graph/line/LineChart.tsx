import { extent, line, scaleLinear, scaleTime } from "d3";
import { Dayjs } from "dayjs";
import React, { FC, useRef, useState } from "react";
import useTooltip from "../../../hooks/useTooltip";
import ArrayUtils from "../../../utils/array-utils";
import {
  ApiResponse,
  Nullable,
  SpendingListRowLineChart,
  SpendingsPage,
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
  response: ApiResponse<SpendingsPage<SpendingListRowLineChart>>;
  allowPagination?: boolean;
  setSearchParams?: (urlSearchParams: URLSearchParams) => void;
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
  allowPagination = true,
  setSearchParams,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const data = response.data?.spendingPage.content;
  const prev = response.metadata?.links.prev;
  const next = response.metadata?.links.next;
  const margins = calculateMargins(height, width);
  const [tracerX, setTracerX] = useState<number>(TRACER_X_INITIAL);
  const tooltip = useTooltip();

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
    currentTarget: EventTarget
  ) => {
    const domPoint = new DOMPointReadOnly(clientX, clientY);
    const svgNode = currentTarget as SVGGraphicsElement;
    const svgPoint = domPoint.matrixTransform(
      svgNode.getScreenCTM()?.inverse()
    );
    setTracerX(svgPoint.x);

    // If tracer hovers over a circle then show tooltip
    let pos: Nullable<TooltipPosition> = null;

    let idx = -1;
    let minDist = POINT_RADIUS * 3;
    const offset = ref.current?.getBoundingClientRect().top || 0;

    for (let i = 0; i < data!.length; i++) {
      const spendingListRow = data![i];
      const d = Math.abs(Math.floor(xScale(spendingListRow.date) - svgPoint.x));

      if (d <= POINT_RADIUS * 3 && Math.min(minDist, d) === d) {
        minDist = d;
        idx = i;
        pos = {
          left: clientX,
          top: yScale(spendingListRow.total) + offset,
        };
      }
    }

    if (idx !== -1 && data) {
      tooltip.showTooltip(
        <LineChartTooltip
          date={data[idx].date}
          total={data[idx].total}
          tooltipPosition={pos}
        />
      );
    } else {
      tooltip.hideTooltip();
    }
  };

  const onClickPaginationBar = (isLeft: boolean) => {
    const link = isLeft
      ? response.metadata?.links.prev
      : response.metadata?.links.next;

    if (!link) {
      return;
    }

    const queryParams = new URLSearchParams(
      link.substring(link.indexOf("?") + 1)
    );

    setSearchParams?.(queryParams);
  };

  const onMouseLeave = () => {
    setTracerX(TRACER_X_INITIAL);
    tooltip.hideTooltip();
  };

  const xScale = scaleTime()
    .domain(
      extent(data!, (d: SpendingListRowLineChart) => d.date) as [Dayjs, Dayjs]
    )
    .range([margins.left, width - margins.right]);

  const yScale = scaleLinear()
    .domain(extent(data!, (d) => d.total) as [number, number])
    .range([height - margins.top, margins.bottom]);

  const lineFn = line<SpendingListRowLineChart>()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.total));

  const d = lineFn(data!);

  // Formula based on width to determine the number of x ticks to show.
  // Display at least 2
  const xTicksToShow = Math.max(
    2,
    Math.floor(xScale.ticks().length * Math.min(width / 2000, 1))
  );

  const xTicks = ArrayUtils.spreadEvenly<Date>(xScale.ticks(), xTicksToShow);
  const yTicks = yScale.ticks(yScale.ticks().length / 2);

  if (!data || !data.length) {
    // This component won't get rendered if there's no data.
    // So just doing this to satisfy Typescript.
    return <></>;
  }

  return (
    <div className="relative w-fit" ref={ref}>
      <svg
        height={height}
        width={width}
        onTouchMove={(e: React.TouchEvent) => moveTracerTouch(e)}
        onMouseMove={(e: React.MouseEvent) => moveTracerMouse(e)}
        onMouseLeave={() => onMouseLeave()}
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
              key={spendingListRow.date.toISOString()}
              spendingListRow={spendingListRow}
              xScale={xScale}
              yScale={yScale}
            />
          ))}

          <XTicks xScale={xScale} xTicks={xTicks} y={height - margins.bottom} />
        </g>
      </svg>

      {allowPagination && prev && (
        <PaginationBar isLeft={true} onClick={onClickPaginationBar} />
      )}

      {allowPagination && next && (
        <PaginationBar isLeft={false} onClick={onClickPaginationBar} />
      )}
    </div>
  );
};

export default LineChart;
