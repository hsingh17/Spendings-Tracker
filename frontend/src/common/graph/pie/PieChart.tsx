import { PieArcDatum, arc, interpolateRgb, pie, scaleSequential } from "d3";
import React, { FC, useState } from "react";
import useDetectMobile from "../../../hooks/useDetectMobile";
import MoneyUtils from "../../../utils/money-utils";
import {
  ApiResponse,
  CategoricalSpendings,
  Nullable,
  TooltipPosition,
} from "../../../utils/types";
import Tooltip from "../Tooltip";

type PieChartProps = {
  width: number;
  height: number;
  response: ApiResponse<CategoricalSpendings[]>;
  setSearchParams: (urlSearchParams: URLSearchParams) => void;
};

const PieChart: FC<PieChartProps> = ({ width, height, response }) => {
  const [tooltipIdx, setTooltipIdx] = useState<Nullable<number>>(null);
  const [tooltipPosition, setTooltipPosition] =
    useState<Nullable<TooltipPosition>>(null);

  const data = response.data;
  if (!data) {
    return <>TODO</>;
  }

  const isMobile = useDetectMobile();
  const innerRadius = height / 4 + (isMobile ? 10 : 25);
  const outerRadius = height / 2 - (isMobile ? 10 : 100);
  const interpolatorScale = scaleSequential()
    .interpolator(interpolateRgb("#EEEEEE", "#00ADB5"))
    .domain([0, data.length]);

  const pieGenerator = pie<CategoricalSpendings>()
    .padAngle(0)
    .value((d) => d.total);

  const arcGenerator = arc<PieArcDatum<CategoricalSpendings>>()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

  const onMouseMove = (e: React.MouseEvent, idx: number) => {
    const clientX = e.clientX;
    const clientY = e.clientY;
    const currentTarget = e.currentTarget;

    const domPoint = new DOMPointReadOnly(clientX, clientY);
    const svgNode = currentTarget as SVGGraphicsElement;
    const svgPoint = domPoint.matrixTransform(
      svgNode.getScreenCTM()?.inverse(),
    );

    setTooltipIdx(idx);
    setTooltipPosition({
      // Need the width / 2 and height / 2 since we transform the svg group by that amount
      // The - 75 is a magic number to make tooltip appear above the mouse pointer not below
      left: svgPoint.x + width / 2,
      top: svgPoint.y + height / 2 - 75,
    });
  };

  return (
    <div className="relative">
      <svg height={height} width={width}>
        <g style={{ transform: `translate(${width / 2}px, ${height / 2}px)` }}>
          {pieGenerator(data).map((d, i) => {
            return (
              <path
                key={d.data.category}
                className="hover:cursor-pointer"
                d={arcGenerator(d) || ""}
                fill={interpolatorScale(i)}
                stroke="#374151"
                strokeWidth={3}
                onMouseMove={(e) => {
                  onMouseMove(e, i);
                }}
                onMouseLeave={() => setTooltipIdx(null)}
              />
            );
          })}
        </g>
      </svg>

      {tooltipIdx && tooltipPosition && data && (
        <Tooltip
          position={tooltipPosition}
          className="w-fit h-fit bg-theme-neutral text-theme-brand p-2"
        >
          <p className="text-lg md:text-xl font-semibold">
            {data[tooltipIdx].category}
          </p>
          <p className="font-bold md:text-lg">
            {MoneyUtils.formatMoneyUsd(data[tooltipIdx].total)}
          </p>
        </Tooltip>
      )}
    </div>
  );
};

export default PieChart;
