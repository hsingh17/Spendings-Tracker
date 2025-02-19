import { FC } from "react";
import { ReactComponent as SortDown } from "../assets/raw/sort-down.svg";
import { ReactComponent as SortUp } from "../assets/raw/sort-up.svg";
import { SortOrder } from "../utils/types";

type SortIconProps = {
  sortOrder: SortOrder;
};

const SortIcon: FC<SortIconProps> = ({ sortOrder }) => {
  const className: string = "w-5 h-5";
  return (
    <div className="flex flex-col">
      <SortUp
        className={className}
        stroke="white"
        fill={sortOrder === SortOrder.ASC ? "white" : "gray"}
      />
      <SortDown
        className={`${className} -mt-[22.5px]`}
        stroke="white"
        fill={sortOrder === SortOrder.DESC ? "white" : "gray"}
      />
    </div>
  );
};

export default SortIcon;
