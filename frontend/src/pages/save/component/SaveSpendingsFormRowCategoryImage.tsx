import React, { FC, useState } from "react";
import Tooltip from "../../../common/Tooltip";
import useDetectScreenWidth from "../../../hooks/useDetectScreenWidth";
import { Nullable, TooltipPosition } from "../../../utils/types";

type SaveSpendingsFormRowCategoryImageProps = {
  category: string;
  imgSrc: string;
};

const SaveSpendingsFormRowCategoryImage: FC<
  SaveSpendingsFormRowCategoryImageProps
> = ({ category, imgSrc }) => {
  const [tooltipPosition, setTooltipPosition] =
    useState<Nullable<TooltipPosition>>(null);
  const isMobile = useDetectScreenWidth();

  const showTooltip = (e: React.MouseEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const boundingRect = img.getBoundingClientRect();
    const rightPosition = isMobile
      ? undefined
      : window.innerWidth - boundingRect.right + boundingRect.width;

    const leftPosition = isMobile ? boundingRect.right : undefined;

    setTooltipPosition({
      left: leftPosition,
      right: rightPosition,
      top: boundingRect.y + 7,
    });
  };

  const hideTooltip = () => {
    setTooltipPosition(null);
  };

  return (
    <>
      <div className="hover:cursor-default">
        <img
          src={imgSrc}
          className="h-10 stroke-black scale-100"
          onMouseOver={(e: React.MouseEvent<HTMLImageElement>) =>
            showTooltip(e)
          }
          onMouseLeave={() => hideTooltip()}
        />
      </div>

      <Tooltip
        position={tooltipPosition}
        enableDynamicTooltip={false}
        className="fixed px-2 py-1 rounded-lg text-center text-sm h-fit bg-theme-cta font-semibold text-black animate-[point-fade-in_0.25s_linear_forwards]"
      >
        <p>{category}</p>
      </Tooltip>
    </>
  );
};

export default SaveSpendingsFormRowCategoryImage;
