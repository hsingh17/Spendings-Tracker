import { FC, ReactNode, useRef } from "react";
import useCalcMouseDir, {
  XMouseDir,
  YMouseDir,
} from "../../hooks/useCalcMouseDir";
import { TooltipPosition } from "../../utils/types";

type TooltipProps = {
  position: TooltipPosition;
  className?: string;
  children: ReactNode;
  enableDynamicTooltip?: boolean;
};

const Tooltip: FC<TooltipProps> = ({
  position,
  className,
  children,
  enableDynamicTooltip = true,
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const mouseDir = useCalcMouseDir();

  const calculateXOffset = (): number => {
    if (mouseDir.xDir === XMouseDir.LEFT || !divRef.current) {
      return 0;
    }
    return divRef.current.clientWidth;
  };

  const calculateYOffset = (): number => {
    if (mouseDir.yDir === YMouseDir.DOWN || !divRef.current) {
      return 0;
    }
    return divRef.current.clientHeight;
  };

  const xOffset = calculateXOffset();
  const yOffset = calculateYOffset();

  return (
    <div
      ref={divRef}
      className={`absolute ${className}`}
      style={{
        display: "block",
        top: enableDynamicTooltip ? position.top + yOffset : position.top,
        left: enableDynamicTooltip ? position.left - xOffset : position.left,
      }}
    >
      {children}
    </div>
  );
};

export default Tooltip;
