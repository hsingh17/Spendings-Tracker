import { FC } from "react";
import { ReactComponent as Icon } from "../raw/graph-empty-state.svg";
import { IconTypeProps } from "./icon-props";

const GraphEmptyStateIcon: FC<IconTypeProps> = ({ className }) => {
  return <Icon className={className} fill="#EEEEEE" />;
};

export default GraphEmptyStateIcon;
