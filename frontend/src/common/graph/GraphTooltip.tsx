import { FC, ReactNode } from "react";

export type GraphTooltipProps = {
  x: number;
  y: number;
  h?: number;
  w: number;
  children?: ReactNode;
};

const GraphTooltip: FC<GraphTooltipProps> = ({ x, y, h, w, children }) => {
  return (
    <g className="z-30">
      <rect width={w} height={h} x={x} y={y} fill="#00ADB5" />
      {children}
    </g>
  );
};

export default GraphTooltip;
