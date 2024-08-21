import { FC } from "react";
import { ApiMetadata, Nullable } from "../../../utils/types";

type TableFooterPageDataProps = {
  apiMetaData: Nullable<ApiMetadata>;
};

const TableFooterPageData: FC<TableFooterPageDataProps> = ({ apiMetaData }) => {
  return (
    <div className="flex text-md font-semibold text-gray-400 flex-col md:flex-row">
      <p>
        {apiMetaData?.currentPage ? apiMetaData.currentPage + 1 : 1} of{" "}
        {apiMetaData?.totalPages ? apiMetaData.totalPages : 1} {" pages"}
        &nbsp;
      </p>

      <p>
        ({apiMetaData?.totalPages ? apiMetaData.totalCount : 0} total items)
      </p>
    </div>
  );
};

export default TableFooterPageData;
