import { FC } from "react";
import { TableButtonsContainerProps } from "../utils/types";
import TableButton from "./TableButton";
import { ReactComponent as LeftArrow } from "../assets/left-arrow.svg";
import { ReactComponent as RightArrow } from "../assets/right-arrow.svg";
import { ReactComponent as DoubleLeftArrow } from "../assets/double-left-arrow.svg";
import { ReactComponent as DoubleRightArrow } from "../assets/double-right-arrow.svg";

const TableButtonContainer: FC<TableButtonsContainerProps> = ({
  apiLinks,
  parentSetSearchParams,
}) => {
  if (apiLinks === null) {
    return null;
  }

  return (
    <div className="flex bg-white border-y-2 border-r-2 border-gray w-fit mt-5 ml-auto"  >
      <TableButton
        parentSetSearchParams={parentSetSearchParams}
        buttonUrl={apiLinks?.first}
        buttonIcon={<DoubleLeftArrow className="w-8 h-8 border-l-2 border-gray"  stroke="gray" fill="gray" strokeWidth={0}/>}
      />
      <TableButton
        parentSetSearchParams={parentSetSearchParams}
        buttonUrl={apiLinks?.prev}
        buttonIcon={<LeftArrow className="w-8 h-8 border-l-2 border-gray"  stroke="gray"/>}
      />
      <TableButton
        parentSetSearchParams={parentSetSearchParams}
        buttonUrl={apiLinks?.next}
        buttonIcon={<RightArrow className="w-8 h-8 border-l-2 border-gray"  stroke="gray"/>}
      />
      <TableButton
        parentSetSearchParams={parentSetSearchParams}
        buttonUrl={apiLinks?.last}
        buttonIcon={<DoubleRightArrow className="w-8 h-8 border-l-2 border-gray"  stroke="gray" fill="gray" strokeWidth={0}/>}
      />
    </div>
  );
};

export default TableButtonContainer;
