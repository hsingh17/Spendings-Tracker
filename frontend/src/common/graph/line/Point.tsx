import { ScaleLinear, ScaleTime } from "d3";
import { FC } from "react";
import useDetectScreenWidth from "../../../hooks/useDetectScreenWidth";
import { SpendingListRowLineChart } from "../../../utils/types";
import { POINT_RADIUS } from "./LineChart";

type PointProps = {
  idx: number;
  spendingListRow: SpendingListRowLineChart;
  xScale: ScaleTime<number, number, never>;
  yScale: ScaleLinear<number, number, never>;
};

const Point: FC<PointProps> = ({ spendingListRow, xScale, yScale }) => {
  const isMobile = useDetectScreenWidth();
  if (isMobile) {
    return <></>;
  }

  return (
    <circle
      key={spendingListRow.date.format()}
      className="hover:cursor-pointer animate-[point-fade-in_0.5s_linear_forwards]"
      fill="white"
      stroke="#374151"
      strokeWidth={5}
      cx={xScale(spendingListRow.date)}
      cy={yScale(spendingListRow.total)}
      r={POINT_RADIUS}
    />
  );
};

export default Point;
