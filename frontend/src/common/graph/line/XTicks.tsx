import { ScaleTime, timeFormat } from "d3";
import { FC } from "react";
import useDetectMobile from "../../../hooks/useDetectMobile";

type XTicksProps = {
  xTicks: Date[];
  xScale: ScaleTime<number, number, never>;
  y: number;
};
export const XTicks: FC<XTicksProps> = ({ xTicks, xScale, y }) => {
  const isMobile = useDetectMobile();
  const xAxisFormatter = timeFormat(isMobile ? "%m/%y" : "%m/%Y");
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

export default XTicks;
