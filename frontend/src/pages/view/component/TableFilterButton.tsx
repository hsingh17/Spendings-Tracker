import { FC } from "react";
import DownChevron from "../../../assets/components/DownChevron";
import FilterIcon from "../../../assets/components/FilterIcon";

type TableFilterButtonProps = {
  isOpen: boolean;
  setOpen: (e: React.MouseEvent, open: boolean) => void;
};

const TableFilterButton: FC<TableFilterButtonProps> = ({ setOpen, isOpen }) => {
  return (
    <button
      className={`flex items-center border-2 px-5 py-1.5 w-fit rounded-3xl hover:cursor-pointer ${
        isOpen ? "border-theme-cta" : "border-gray-300"
      }`}
      onClick={(e: React.MouseEvent<HTMLElement>) => setOpen(e, !isOpen)}
    >
      <FilterIcon className="w-4 h-4 mt-0.5" />
      <p className="ml-1 font-semibold">Filter</p>
      <DownChevron className="h-3 w-3 ml-8 mt-1" />
    </button>
  );
};

export default TableFilterButton;
