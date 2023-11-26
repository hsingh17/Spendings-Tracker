import TableButton from "./TableButton";
import { ReactComponent as DoubleLeftArrow } from "../../../assets/raw/double-left-arrow.svg";
import { ReactComponent as DoubleRightArrow } from "../../../assets/raw/double-right-arrow.svg";
import { ReactComponent as LeftArrow } from "../../../assets/raw/left-arrow.svg";
import { ReactComponent as RightArrow } from "../../../assets/raw/right-arrow.svg";
import { FC } from "react";
import { TableButtonsContainerProps } from "../../../utils/types";

const TableButtonsContainer: FC<TableButtonsContainerProps> = ({
  apiLinks,
  parentSetSearchParams,
}) => {
  return (
    <div className="flex bg-white border-r-2 border-y-2 border-gray">
      <TableButton
        parentSetSearchParams={parentSetSearchParams}
        buttonUrl={apiLinks?.first}
        buttonIcon={
          <DoubleLeftArrow
            className="w-7 h-7 border-l-2 border-gray"
            stroke="gray"
            fill="gray"
            strokeWidth={0}
          />
        }
      />
      <TableButton
        parentSetSearchParams={parentSetSearchParams}
        buttonUrl={apiLinks?.prev}
        buttonIcon={
          <LeftArrow 
            className="w-7 h-7 border-l-2 border-gray" 
            stroke="gray" 
          />
        }
      />
      <TableButton
        parentSetSearchParams={parentSetSearchParams}
        buttonUrl={apiLinks?.next}
        buttonIcon={
          <RightArrow
            className="w-7 h-7 border-l-2 border-gray"
            stroke="gray"
          />
        }
      />
      <TableButton
        parentSetSearchParams={parentSetSearchParams}
        buttonUrl={apiLinks?.last}
        buttonIcon={
          <DoubleRightArrow
            className="w-7 h-7 border-l-2 border-gray"
            stroke="gray"
            fill="gray"
            strokeWidth={0}
          />
        }
      />
    </div>
  );
};

export default TableButtonsContainer;
