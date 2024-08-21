import { FC, JSXElementConstructor, ReactElement } from "react";
import { Nullable } from "../../../utils/types";

type TableButtonProps = {
  buttonIcon: ReactElement<unknown, JSXElementConstructor<unknown>>;
  buttonUrl: Nullable<string>;
  setSearchParams: (searchParams: URLSearchParams) => void;
};

const TableButton: FC<TableButtonProps> = ({
  setSearchParams,
  buttonUrl,
  buttonIcon,
}) => {
  const showButton: boolean = buttonUrl !== null && buttonUrl !== undefined;

  const queryParams: string =
    showButton && buttonUrl ? buttonUrl.split("?")[1] : "";

  if (!showButton) {
    return null;
  }

  return (
    <button onClick={() => setSearchParams(new URLSearchParams(queryParams))}>
      {buttonIcon}
    </button>
  );
};

export default TableButton;
