import { FC } from "react";

type BarProps = {
  category: string;
  height: number;
  width: number;
  x: number;
  y: number;
  fill: string;
};

const Bar: FC<BarProps> = ({ category, height, width, x, y, fill }) => {
  return (
    <rect
      key={category}
      // className="hover:cursor-pointer hover:fill-theme-cta animate-[scale-bar-up_1.5s_cubic-bezier(0.25,1,0.5,1)_forwards]"
      // className="fill-theme-cta"
      // style={{
      //   transformOrigin: "center bottom",
      //   transform: "scale(1, 0)",
      // }}
      // onMouseOver={() => onMouseOver(i, x, y)}
      // onMouseLeave={() => setTooltipIdx(null)}
      fill={fill}
      width={width}
      x={x}
      y={y}
      height={height}
    />
  );
};

export default Bar;
