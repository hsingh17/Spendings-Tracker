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
      className="animate-[linechart_1.5s_cubic-bezier(1,0,0,1)_forwards]"
      d={d}
      fill="none"
      stroke="#00ADB5"
      strokeWidth={2}
      strokeDasharray={"100000"}
      strokeDashoffset={-100000} />
  );
};

export default Line;