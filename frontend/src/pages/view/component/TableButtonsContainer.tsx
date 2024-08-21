import { FC, JSXElementConstructor, ReactElement } from "react";
import { ReactComponent as DoubleLeftArrow } from "../../../assets/raw/double-left-arrow.svg";
import { ReactComponent as DoubleRightArrow } from "../../../assets/raw/double-right-arrow.svg";
import { ReactComponent as LeftArrow } from "../../../assets/raw/left-arrow.svg";
import { ReactComponent as RightArrow } from "../../../assets/raw/right-arrow.svg";
import { ApiLinks, Nullable } from "../../../utils/types";
import TableButton from "./TableButton";

type TableButtonsContainerProps = {
  apiLinks: Nullable<ApiLinks>;
  setSearchParams: (searchParams: URLSearchParams) => void;
};
type TableButtonListElement = {
  key: string;
  buttonIcon: ReactElement<unknown, JSXElementConstructor<unknown>>;
};

const BUTTONS: TableButtonListElement[] = [
  {
    key: "first",
    buttonIcon: (
      <DoubleLeftArrow
        className="w-7 h-7 border-l-2 border-gray"
        stroke="gray"
        fill="gray"
        strokeWidth={0}
      />
    ),
  },
  {
    key: "prev",
    buttonIcon: (
      <LeftArrow className="w-7 h-7 border-l-2 border-gray" stroke="gray" />
    ),
  },
  {
    key: "next",
    buttonIcon: (
      <RightArrow className="w-7 h-7 border-l-2 border-gray" stroke="gray" />
    ),
  },
  {
    key: "last",
    buttonIcon: (
      <DoubleRightArrow
        className="w-7 h-7 border-l-2 border-gray"
        stroke="gray"
        fill="gray"
        strokeWidth={0}
      />
    ),
  },
];

const TableButtonsContainer: FC<TableButtonsContainerProps> = ({
  apiLinks,
  setSearchParams,
}) => {
  return (
    <div className="flex bg-white border-r-2 border-y-2 border-gray">
      {BUTTONS.map((val) => {
        const keyStr = val.key as keyof typeof apiLinks;
        return (
          <TableButton
            key={keyStr}
            setSearchParams={setSearchParams}
            buttonUrl={apiLinks?.[keyStr]}
            buttonIcon={val.buttonIcon}
          />
        );
      })}
    </div>
  );
};

export default TableButtonsContainer;
