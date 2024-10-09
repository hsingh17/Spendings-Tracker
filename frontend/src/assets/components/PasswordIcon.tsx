import { FC } from "react";
import { ReactComponent as Icon } from "../raw/lock.svg";
import { IconTypeProps } from "./icon-props";

const PasswordIcon: FC<IconTypeProps> = ({ className = "w-10 h-10" }) => {
  return <Icon className={className} fill="white" />;
};

export default PasswordIcon;
