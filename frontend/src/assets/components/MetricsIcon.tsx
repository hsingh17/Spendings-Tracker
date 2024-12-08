import { FC } from "react";
import { ReactComponent as Icon } from "../raw/metrics-icon.svg";
import { IconTypeProps } from "./icon-props";

const MetricsIcon: FC<IconTypeProps> = ({ className }) => {
  return <Icon className={className} fill="white" />;
};

export default MetricsIcon;
