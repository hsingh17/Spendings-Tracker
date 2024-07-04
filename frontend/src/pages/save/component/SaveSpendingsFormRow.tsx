import React, { FC, useState } from "react";
import { ReactComponent as DeleteRowIcon } from "../../../assets/raw/delete-icon.svg";
import Tooltip from "../../../common/graph/Tooltip";
import useDetectMobile from "../../../hooks/useDetectMobile";
import MoneyUtils from "../../../utils/money-utils";
import {
  CategoriesMap,
  Nullable,
  SpendingFormInput,
  TooltipPosition,
} from "../../../utils/types";

export type SpendingsFormRowProps = {
  idx: number;
  spending: SpendingFormInput;
  categoriesMap: CategoriesMap;
  handleDeleteRow: (idx: number) => void;
};

const SaveSpendingsFormRow: FC<SpendingsFormRowProps> = ({
  idx,
  spending,
  categoriesMap,
  handleDeleteRow,
}) => {
  const isMobile = useDetectMobile();
  const [tooltipPosition, setTooltipPosition] =
    useState<Nullable<TooltipPosition>>(null);

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

  if (spending.delete) {
    // SpendingFormInput marked for deletion
    return <></>;
  }

  return (
    <div className="flex flex-row items-center mt-1 w-full p-1 rounded-xl hover:bg-slate-300 hover:bg-opacity-20 hover:cursor-pointer">
      <div className="hover:cursor-default">
        <img
          src={categoriesMap[spending.category || ""]}
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
        <p>{spending.category}</p>
      </Tooltip>

      <p className="ml-2 mb-[2px] font-semibold text-xl">
        {MoneyUtils.formatMoneyUsd(spending.amount)}
      </p>

      <button className="ml-auto mr-2" onClick={() => handleDeleteRow(idx)}>
        <DeleteRowIcon
          className="w-10 h-10 p-1 rounded-lg hover:bg-slate-400 hover:bg-opacity-35"
          stroke="red"
        />
      </button>
    </div>
  );
};

export default SaveSpendingsFormRow;
