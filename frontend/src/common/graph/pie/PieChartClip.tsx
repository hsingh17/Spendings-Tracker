import { FC } from "react";

type PieChartClipProps = {
  outerRadius: number;
  innerRadius: number;
};
const PieChartClip: FC<PieChartClipProps> = ({ innerRadius, outerRadius }) => {
  return (
    <circle
      className="animate-[draw-stroke_0.25s_linear_backwards]"
      r={(outerRadius + innerRadius) / 2}
      strokeDasharray={"100000"}
      strokeDashoffset={-100000}
      strokeWidth={outerRadius - innerRadius}
      stroke="#374151"
      fill="none"
      opacity={1}
    />
  );
};

export default PieChartClip;
