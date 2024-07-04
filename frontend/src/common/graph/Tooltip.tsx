import { FC, ReactNode, useRef } from "react";
import useCalcMouseDir, {
  XMouseDir,
  YMouseDir,
} from "../../hooks/useCalcMouseDir";
import { Nullable, TooltipPosition } from "../../utils/types";

enum Direction {
  TOP,
  RIGHT,
  BOTTOM,
  LEFT,
}

type TooltipProps = {
  position: Nullable<TooltipPosition>;
  className?: string;
  children: ReactNode;
  enableDynamicTooltip?: boolean;
};

const Tooltip: FC<TooltipProps> = ({
  position,
  className = "",
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

  const calculateFinalPosition = (
    direction: Direction,
    positionValue?: number,
  ): number | undefined => {
    if (!enableDynamicTooltip || !positionValue) {
      return positionValue;
    }

    switch (direction) {
      case Direction.TOP:
      case Direction.BOTTOM:
        return positionValue + yOffset;
      case Direction.LEFT:
      case Direction.RIGHT:
        return positionValue - xOffset;
    }
  };

  const xOffset = calculateXOffset();
  const yOffset = calculateYOffset();

  if (!position) {
    return <></>;
  }

  return (
    <div
      ref={divRef}
      className={className}
      style={{
        display: "block",
        top: calculateFinalPosition(Direction.TOP, position.top),
        left: calculateFinalPosition(Direction.LEFT, position.left),
        bottom: calculateFinalPosition(Direction.BOTTOM, position.bottom),
        right: calculateFinalPosition(Direction.RIGHT, position.right),
      }}
    >
      {children}
    </div>
  );
};

export default Tooltip;
