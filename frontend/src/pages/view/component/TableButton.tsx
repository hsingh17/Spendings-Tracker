import { FC } from "react";
import { TableButtonProps } from "../../../utils/types";

const TableButton: FC<TableButtonProps> = ({
  parentSetSearchParams,
  buttonUrl,
  buttonIcon,
}) => {
  const showButton: boolean =
    buttonUrl !== null &&
    buttonUrl !== null &&
    buttonUrl !== undefined &&
    buttonUrl !== undefined;
  const queryParams: string = buttonUrl ? buttonUrl.split("?")[1] : "";
  if (!showButton) {
    return null;
  }

  return (
    <button
      onClick={() => parentSetSearchParams(new URLSearchParams(queryParams))}
    >
      {buttonIcon}
    </button>
  );
};

export default TableButton;
