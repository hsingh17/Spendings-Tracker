import { ScaleLinear, ScaleTime, timeParse } from "d3";
import { FC } from "react";
import useDetectMobile from "../../../hooks/useDetectMobile";
import { ISO_FORMAT } from "../../../utils/constants";
import { Nullable, SpendingListRow } from "../../../utils/types";
import { POINT_RADIUS } from "./LineChart";

type PointProps = {
  idx: number;
  spendingListRow: SpendingListRow;
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
  const parser = timeParse(ISO_FORMAT);
  const isMobile = useDetectMobile();
  if (isMobile) {
    return <></>;
  }

  return (
    <circle
      key={spendingListRow.date}
      className="hover:cursor-pointer animate-[pointfadein_0.5s_linear_forwards]"
      onMouseOver={() => setTooltipIdx(idx)}
      onMouseLeave={() => setTooltipIdx(null)}
      fill="white"
      stroke="#374151"
      strokeWidth={5}
      cx={xScale(parser(spendingListRow.date)!)}
      cy={yScale(spendingListRow.total)}
      r={POINT_RADIUS}
    />
  );
};

export default Point;
