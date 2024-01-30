import React, { FC } from "react";
import { ReactComponent as LeftArrow } from "../../../assets/raw/left-arrow.svg";
import { ReactComponent as RightArrow } from "../../../assets/raw/right-arrow.svg";

type PaginationBarProps = {
  isLeft: boolean;
  onClick: (e: React.MouseEvent, isLeft: boolean) => void;
};

const PaginationBar: FC<PaginationBarProps> = ({ isLeft, onClick }) => {
  return (
    <div
      className={`absolute bg-theme-brand-secondary top-0 h-full w-10 opacity-25 z-10 hover:opacity-100
        flex flex-row items-center hover:cursor-pointer ${
          isLeft ? "left-0" : "right-0"
        }`}
      onClick={(e: React.MouseEvent) => onClick(e, isLeft)}
    >
      {isLeft ? (
        <LeftArrow className="w-10 h-10 ml-auto" stroke="gray" />
      ) : (
        <RightArrow className="w-10 h-10 ml-auto" stroke="gray" />
      )}
    </div>
  );
};

export default PaginationBar;
