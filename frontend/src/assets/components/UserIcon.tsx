import { FC } from "react";
import { ReactComponent as Icon } from "../raw/user.svg";
import { IconTypeProps } from "./icon-props";

const UserIcon: FC<IconTypeProps> = ({ className }) => {
  return <Icon className={className} fill="white" />;
};

export default UserIcon;
