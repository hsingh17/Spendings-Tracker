import { FC } from "react";
import { Nullable } from "../../../utils/types";

type LineProps = {
  d: Nullable<string>;
};
const Line: FC<LineProps> = ({ d }) => {
  if (!d) {
    return <></>;
  }

  return (
    <path
      className="animate-[draw-stroke_2.5s_cubic-bezier(0,1.27,.96,1.12)_forwards]"
      d={d}
      fill="none"
      stroke="#00ADB5"
      strokeWidth={2}
      strokeDasharray={"100000"}
      strokeDashoffset={-100000}
    />
  );
};

export default Line;
