import { FC } from "react";
import { ReactComponent as Icon } from "../raw/dashboard-icon.svg";
import { IconTypeProps } from "./icon-props";

const DashboardIcon: FC<IconTypeProps> = ({ className }) => {
  return <Icon className={className} stroke="white" fill="none" />;
};

export default DashboardIcon;
