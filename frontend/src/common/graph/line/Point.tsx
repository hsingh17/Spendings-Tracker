import { ScaleLinear, ScaleTime } from "d3";
import { FC } from "react";
import useDetectMobile from "../../../hooks/useDetectMobile";
import { Nullable, SpendingListRowLineChart } from "../../../utils/types";
import { POINT_RADIUS } from "./LineChart";

type PointProps = {
  idx: number;
  spendingListRow: SpendingListRowLineChart;
  setTooltipIdx: (date: Nullable<number>) => void;
  xScale: ScaleTime<number, number, never>;
  yScale: ScaleLinear<number, number, never>;
};

const Point: FC<PointProps> = ({
  idx,
  setTooltipIdx,
  spendingListRow,
  xScale,
  yScale,
}) => {
  const isMobile = useDetectMobile();
  if (isMobile) {
    return <></>;
  }

  return (
    <circle
      key={spendingListRow.date.format()}
      className="hover:cursor-pointer animate-[point-fade-in_0.5s_linear_forwards]"
      onMouseOver={() => setTooltipIdx(idx)}
      onMouseLeave={() => setTooltipIdx(null)}
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
