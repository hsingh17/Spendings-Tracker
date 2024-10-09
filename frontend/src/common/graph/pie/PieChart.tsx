import { PieArcDatum, arc, interpolateRgb, pie, scaleSequential } from "d3";
import React, { FC, useState } from "react";
import useDetectMobile from "../../../hooks/useDetectMobile";
import {
  ApiResponse,
  CategoricalSpendings,
  Nullable,
  SpendingsPage,
  TooltipPosition,
} from "../../../utils/types";
import CategoricalChartTooltip from "../CategoricalChartTooltip";
import PieChartClip from "./PieChartClip";
import PieChartSector from "./PieChartSector";

const PI_OVER_2 = Math.PI / 2;
const ANIMATION_DISTANCE = 50;

type PieChartProps = {
  width: number;
  height: number;
  response: ApiResponse<SpendingsPage>;
  setSearchParams: (urlSearchParams: URLSearchParams) => void;
};

function calculateDisplacedCoords(angle: number): number[] {
  const refAngle = angle <= Math.PI ? PI_OVER_2 : 3 * PI_OVER_2;
  const angleDiff = Math.abs(angle - refAngle);
  let x = Math.round(ANIMATION_DISTANCE * Math.cos(angleDiff));
  let y = Math.round(ANIMATION_DISTANCE * Math.sin(angleDiff));

  // Need to know what quadrant the angle is in so we can apply proper translating
  const quadrant = Math.ceil(angle / PI_OVER_2);
  x *= quadrant == 3 || quadrant == 4 ? -1 : 1;
  y *= quadrant == 2 || quadrant == 3 ? 1 : -1;

  return [x, y];
}

const PieChart: FC<PieChartProps> = ({ width, height, response }) => {
  const [tooltipIdx, setTooltipIdx] = useState<Nullable<number>>(null);
  const [tooltipPosition, setTooltipPosition] =
    useState<Nullable<TooltipPosition>>(null);
  const [arcStyle, setArcStyle] = useState<string>();
  const data = response.data?.spendingPage.content;

  if (!data || !data.length) {
    // This component won't get rendered if there's no data.
    // So just doing this to satisfy Typescript.
    return <></>;
  }

  const isMobile = useDetectMobile();
  const innerRadius = height / 4 + (isMobile ? 10 : 25);
  const outerRadius = height / 2 - (isMobile ? 10 : 100);
  const interpolatorScale = scaleSequential()
    .interpolator(interpolateRgb("#EEEEEE", "#00ADB5"))
    .domain([0, data.length]);

  const pieGenerator = pie<CategoricalSpendings>().value((d) => d.total);

  const arcGenerator = arc<PieArcDatum<CategoricalSpendings>>()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

  const showTooltip = (e: React.MouseEvent, idx: number, curAngle: number) => {
    const domPoint = new DOMPointReadOnly(e.clientX, e.clientY);
    const svgNode = e.currentTarget as SVGGraphicsElement;
    const svgPoint = domPoint.matrixTransform(
      svgNode.getScreenCTM()?.inverse(),
    );
    const [x, y] = calculateDisplacedCoords(curAngle);

    setArcStyle(`translate(${x}px, ${y}px)`);
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
        <g
          className="animate-[rotate-to-zero_1.25s_ease-in-out_forwards]"
          style={{
            transform: `translate(${width / 2}px, ${height / 2}px)`,
            transformOrigin: "center center",
            scale: "1",
            rotate: "180deg",
          }}
        >
          {pieGenerator(data).map((d, i) => {
            return (
              <PieChartSector
                key={d.data.category}
                datum={d}
                idx={i}
                fill={interpolatorScale(i)}
                arcStyle={i == tooltipIdx ? arcStyle : undefined}
                path={arcGenerator(d) || ""}
                setTooltipIdx={setTooltipIdx}
                onMouseMove={showTooltip}
              />
            );
          })}

          <PieChartClip outerRadius={outerRadius} innerRadius={innerRadius} />
        </g>
      </svg>

      <CategoricalChartTooltip
        category={
          tooltipIdx || tooltipIdx === 0 ? data[tooltipIdx].category : ""
        }
        total={tooltipIdx || tooltipIdx === 0 ? data[tooltipIdx].total : NaN}
        tooltipPosition={tooltipPosition}
      />
    </div>
  );
};

export default PieChart;
