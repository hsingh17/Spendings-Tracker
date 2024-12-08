import { FC } from "react";
import { ReactComponent as Icon } from "../raw/warning-icon.svg";
import { IconTypeProps } from "./icon-props";

const WarningIcon: FC<IconTypeProps> = ({ className }) => {
  return <Icon className={className} />;
};

export default WarningIcon;
