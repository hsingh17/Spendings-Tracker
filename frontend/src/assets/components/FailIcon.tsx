import { FC } from "react";
import { ReactComponent as Icon } from "../raw/fail.svg";
import { IconTypeProps } from "./icon-props";

const FailIcon: FC<IconTypeProps> = ({ className }) => {
  return <Icon className={className} />;
};

export default FailIcon;
