import { FC } from "react";
import { ReactComponent as Icon } from "../raw/filter-icon.svg";
import { IconTypeProps } from "./icon-props";

const FilterIcon: FC<IconTypeProps> = ({ className }) => {
  return <Icon className={className} />;
};

export default FilterIcon;
