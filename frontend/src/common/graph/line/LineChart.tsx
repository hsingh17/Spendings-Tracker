import { extent, line, scaleLinear, scaleTime, timeParse } from "d3";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import useDetectMobile from "../../../hooks/useDetectMobile";
import { Constants } from "../../../utils/constants";
import { ApiResponse, Nullable, SpendingListRow } from "../../../utils/types";
import { Line } from "./Line";
import { Point } from "./Point";
import Tooltip from "./Tooltip";
import Tracer from "./Tracer";
import { XTicks } from "./XTicks";
import { YTicks } from "./YTicks";
import PaginationBar from "./PaginationBar";

const TRACER_X_INITIAL = -10;
export const POINT_RADIUS = 7;

function calculateMargins(height: number, width: number) {
  return {
    left: width / 20,
    right: width / 20,
    top: height / 5,
    bottom: height / 20,
  };
}

export type TooltipPosition = {
  top: number;
  left: number;
};

type LineChartProps = {
  width: number;
  height: number;
  response: ApiResponse<SpendingListRow[]>;
  setSearchParams: Dispatch<SetStateAction<URLSearchParams>>;
};

const LineChart: FC<LineChartProps> = ({
  response,
  height,
  width,
  setSearchParams,
}) => {
  const data = response.data;
  const prev = response.metadata?.links.prev;
  const next = response.metadata?.links.next;
  const parser = timeParse(Constants.ISO_FORMAT);
  const margins = calculateMargins(height, width);
  const isMobile = useDetectMobile();
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

    let i = 0;
    for (; i < data!.length; i++) {
      const spendingListRow = data![i];
      const d = Math.floor(xScale(parser(spendingListRow.date)!) - svgPoint.x);
      if (Math.abs(d) <= POINT_RADIUS * 2) {
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

    const searchTerm = "page";
    const idxPage = link.indexOf(searchTerm + "=");
    if (idxPage == -1) {
      return;
    }

    const page = link.substring(idxPage + searchTerm.length + 1);
    setSearchParams(new URLSearchParams([[searchTerm, page]]));
  };

  const xScale = scaleTime()
    .domain(
      extent(data!, (d: SpendingListRow) => parser(d.date)) as [Date, Date]
    )
    .range([margins.left, width - margins.right]);

  const yScale = scaleLinear()
    .domain(extent(data!, (d) => d.total) as [number, number])
    .range([height - margins.top, margins.bottom]);

  const lineFn = line<SpendingListRow>()
    .x((d) => xScale(parser(d.date)!))
    .y((d) => yScale(d.total));

  const d = lineFn(data!);

  const xTicks = isMobile
    ? xScale.ticks(Math.floor(xScale.ticks().length / 2))
    : xScale.ticks(Math.floor(xScale.ticks().length / 2));

  const yTicks = yScale.ticks(yScale.ticks().length / 2);

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
            x2={width - margins.right}
            yScale={yScale}
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

      {tooltipIdx !== null && tooltipIdx !== undefined && (
        <Tooltip
          tooltipPosition={tooltipPosition}
          date={data![tooltipIdx].date}
          total={data![tooltipIdx].total}
        />
      )}

      {prev && <PaginationBar isLeft={true} onClick={onClickPaginationBar} />}
      {next && <PaginationBar isLeft={false} onClick={onClickPaginationBar} />}
    </div>
  );
};

export default LineChart;
