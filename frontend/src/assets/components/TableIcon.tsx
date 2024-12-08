import { FC } from "react";
import { ReactComponent as Icon } from "../raw/table-icon.svg";
import { IconTypeProps } from "./icon-props";

const TableIcon: FC<IconTypeProps> = ({ className }) => {
  return <Icon className={className} stroke="white" />;
};

export default TableIcon;
