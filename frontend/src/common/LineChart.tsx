import {
  extent,
  format,
  line,
  scaleLinear,
  scaleTime,
  timeFormat,
  timeParse,
} from "d3";
import { FC } from "react";
import { Constants } from "../utils/constants";
import { SpendingListRow } from "../utils/types";
import useDetectMobile from "../hooks/useDetectMobile";

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

const LineChart: FC<LineChartProps> = ({ data, height, width }) => {
  const parser = timeParse(Constants.ISO_FORMAT);
  const margins = calculateMargins(height, width);
  const isMobile = useDetectMobile();

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

  const xAxisFormatter = timeFormat(isMobile ? "%m/%y" : "%b %Y");

  const xTicks = isMobile ? xScale.ticks(xScale.ticks().length / 2) : xScale.ticks();
  
  return (
    <svg height={height} width={width}>
      <g>
        <path d={d ? d : ""} fill="none" stroke="#00ADB5" strokeWidth={2} />

        {data.map((spendingListRow) => {
          return (
            <circle
              key={spendingListRow.date}
              fill="#00ADB5"
              stroke="#EEEEEE"
              strokeWidth={2}
              cx={xScale(parser(spendingListRow.date)!)}
              cy={yScale(spendingListRow.total)}
              r={4}
            />
          );
        })}

        {xTicks.map((date) => {
          return (
            <text
              key={date.toDateString()}
              className="font-semibold"
              fill="gray"
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
