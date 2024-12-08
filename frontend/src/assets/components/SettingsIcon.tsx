import { FC } from "react";
import { ReactComponent as Icon } from "../raw/settings-icon.svg";
import { IconTypeProps } from "./icon-props";

const SettingsIcon: FC<IconTypeProps> = ({ className }) => {
  return <Icon className={className} fill="white" stroke="white" />;
};

export default SettingsIcon;
