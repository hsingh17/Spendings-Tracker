import { FC } from "react";
import { ReactComponent as Icon } from "../raw/mini-logo.svg";
import { IconTypeProps } from "./icon-props";

const MiniLogo: FC<IconTypeProps> = ({ className }) => {
  return <Icon className={className} />;
};

export default MiniLogo;
