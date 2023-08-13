import { FC } from "react";
import { ApiLinks, Nullable, TableFooterContainerProps } from "../utils/types";
import TablePageDropdown from "./TablePageDropdown";
import TableButtonsContainer from "./TableButtonsContainer";
import TableFooterPageData from "./TableFooterPageData";

const TableFooterContainer: FC<TableFooterContainerProps> = ({
  apiMetaData,
  parentSetSearchParams,
}) => {
  if (apiMetaData === null) {
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
