import { FC } from "react";
import { ApiLinks, Nullable, TableFooterContainerProps } from "../utils/types";
import TablePageDropdown from "./TablePageDropdown";
import TableButtonsContainer from "./TableButtonsContainer";

const TableFooterContainer: FC<TableFooterContainerProps> = ({
  apiMetaData,
  parentSetSearchParams,
}) => {
  if (apiMetaData === null) {
    return null;
  }

  return (
    <div className="flex mt-2 h-fit">
      <div className="flex text-md font-semibold text-gray-400 flex-col md:flex-row">
        <p>
          {apiMetaData?.currentPage ? apiMetaData.currentPage + 1 : 1} of{" "}
          {apiMetaData?.totalPages ? apiMetaData.totalPages : 1} {" pages"}
          &nbsp;
        </p>

        <p>
          ({apiMetaData?.totalPages ? apiMetaData.totalCount + 1 : 1} total
          items)
        </p>
      </div>

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
