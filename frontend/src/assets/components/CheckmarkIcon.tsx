import { FC } from "react";
import { ReactComponent as Icon } from "../raw/checkmark.svg";
import { IconTypeProps } from "./icon-props";

const CheckmarkIcon: FC<IconTypeProps> = ({ className }) => {
  return <Icon className={className} />;
};

export default CheckmarkIcon;
