import { FC } from "react";
import { ApiResponse, SpendingsPage } from "../../../utils/types";
import TableButtonsContainer from "./TableButtonsContainer";
import TableFooterPageData from "./TableFooterPageData";
import TablePageDropdown from "./TablePageDropdown";

type TableFooterContainerProps = {
  response?: ApiResponse<SpendingsPage>;

  setSearchParams: (searchParams: URLSearchParams) => void;
};

const TableFooterContainer: FC<TableFooterContainerProps> = ({
  response,
  setSearchParams,
}) => {
  const apiMetaData = response?.metadata;

  if (!apiMetaData) {
    return <></>;
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
