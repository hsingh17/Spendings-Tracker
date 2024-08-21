import { FC } from "react";
import { ApiMetadata, Nullable } from "../../../utils/types";
import TableButtonsContainer from "./TableButtonsContainer";
import TableFooterPageData from "./TableFooterPageData";
import TablePageDropdown from "./TablePageDropdown";

type TableFooterContainerProps = {
  isLoading: boolean;
  apiMetaData: Nullable<ApiMetadata>;
  setSearchParams: (searchParams: URLSearchParams) => void;
};

const TableFooterContainer: FC<TableFooterContainerProps> = ({
  isLoading,
  apiMetaData,
  setSearchParams,
}) => {
  if (!apiMetaData || isLoading) {
    return null;
  }

  return (
    <div className="flex mt-2 h-fit">
      <TableFooterPageData apiMetaData={apiMetaData} />

      <div className="flex w-fit ml-auto items-center">
        <TablePageDropdown setSearchParams={setSearchParams} />

        <TableButtonsContainer
          setSearchParams={setSearchParams}
          apiLinks={apiMetaData?.links}
        />
      </div>
    </div>
  );
};

export default TableFooterContainer;
