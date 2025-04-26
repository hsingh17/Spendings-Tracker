import { FC } from "react";
import { ReactComponent as Icon } from "../raw/logo.svg";
import { IconTypeProps } from "./icon-props";

const Logo: FC<IconTypeProps> = ({ className }) => {
  return <Icon className={className} />;
};

export default Logo;
