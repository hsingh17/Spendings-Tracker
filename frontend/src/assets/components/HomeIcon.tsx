import { FC } from "react";
import { ReactComponent as Icon } from "../raw/home-icon.svg";
import { IconTypeProps } from "./icon-props";

const HomeIcon: FC<IconTypeProps> = ({ className }) => {
  return <Icon className={className} fill="white" />;
};

export default HomeIcon;
