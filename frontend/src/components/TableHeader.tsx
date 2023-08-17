import { FC } from "react";
import SortIcon from "./SortIcon";
import { TableHeaderProps, SortType, SortOrder } from "../utils/types";

const TableHeader: FC<TableHeaderProps> = ({ parentHandleSort, sort }) => {
  return (
    <thead>
      <tr className="bg-theme-brand text-theme-neutral text-xs font-bold uppercase w-full">
        <td className="px-2 py-2 w-1/3 md:w-1/6 whitespace-nowrap hover:cursor-pointer">
          <div
            className="flex flex-row items-center"
            onClick={() => parentHandleSort(SortType.DATE)}
          >
            Date
            <SortIcon sortOrder={sort.sortType === SortType.DATE ? sort.sortOrder : SortOrder.NONE}/>
          </div>
        </td>
        <td className="px-2 py-2 w-1/6  hover:cursor-pointer">
          <div
            className="flex flex-row items-center justify-end"
            onClick={() => parentHandleSort(SortType.TOTAL)}
          >
            Total
            <SortIcon sortOrder={sort.sortType === SortType.TOTAL ? sort.sortOrder : SortOrder.NONE}/>
          </div>
        </td>
        <td className="px-2 py-2 text-center">
          <div className="flex flex-row items-center justify-center">
            Actions
          </div>
        </td>
      </tr>
    </thead>
  );
};

export default TableHeader;
