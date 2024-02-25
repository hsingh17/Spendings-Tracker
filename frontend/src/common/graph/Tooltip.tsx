import { FC, ReactNode } from "react";
import { TooltipPosition } from "../../utils/types";

type TooltipProps = {
  position: TooltipPosition;
  className?: string;
  children: ReactNode;
};

const Tooltip: FC<TooltipProps> = ({ position, className, children }) => {
  return (
    <div
      className={`absolute ${className}`}
      style={{
        display: "block",
        top: position.top,
        left: position.left,
      }}
    >
      {children}
    </div>
  );
};

export default Tooltip;
