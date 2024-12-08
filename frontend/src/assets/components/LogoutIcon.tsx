import { FC } from "react";
import { ReactComponent as Icon } from "../raw/logout-icon.svg";
import { IconTypeProps } from "./icon-props";

const LogoutIcon: FC<IconTypeProps> = ({ className }) => {
  return <Icon className={className} stroke="white" />;
};

export default LogoutIcon;
