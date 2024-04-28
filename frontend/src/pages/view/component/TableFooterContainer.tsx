import { FC } from "react";
import { TableFooterContainerProps } from "../../../utils/types";
import TableButtonsContainer from "./TableButtonsContainer";
import TableFooterPageData from "./TableFooterPageData";
import TablePageDropdown from "./TablePageDropdown";

const TableFooterContainer: FC<TableFooterContainerProps> = ({
  isLoading,
  apiMetaData,
  parentSetSearchParams,
}) => {
  if (!apiMetaData || isLoading) {
    return null;
  }

  return (
    <div className="flex mt-2 h-fit">
      <TableFooterPageData apiMetaData={apiMetaData} />

      <div className="flex w-fit ml-auto items-center">
        <TablePageDropdown parentSetSearchParams={parentSetSearchParams} />

        <TableButtonsContainer
          parentSetSearchParams={parentSetSearchParams}
          apiLinks={apiMetaData?.links}
        />
      </div>
    </div>
  );
};

export default TableFooterContainer;
