import { ScaleTime, timeFormat } from "d3";
import { FC } from "react";

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
            key={date.toISOString()}
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

export default XTicks;
