import { FC } from "react";

type TracerProps = {
  height: number;
  x: number;
};

const Tracer: FC<TracerProps> = ({ height, x }) => {
  return <rect width={2} height={height} x={x} fill="gray" />;
};

export default Tracer;
