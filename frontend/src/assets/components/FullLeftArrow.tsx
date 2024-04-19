import { FC } from "react";
import { ReactComponent as Icon } from "../raw/full-left-arrow.svg";
import { IconTypeProps } from "./icon-props";

const FullLeftArrow: FC<IconTypeProps> = ({ className }) => {
  return <Icon className={`${className}`} />;
};

export default FullLeftArrow;
