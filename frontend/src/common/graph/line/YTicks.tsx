import { ScaleLinear } from "d3";
import { FC } from "react";

type YTicksProps = {
  yTicks: number[];
  x1: number;
  x2: number;
  yScale: ScaleLinear<number, number, never>;
};
export const YTicks: FC<YTicksProps> = ({ x1, x2, yScale, yTicks }) => {
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

export default YTicks;
