import { FC } from "react";
import { ReactComponent as Icon } from "../raw/horizontal-dots.svg";
import { IconTypeProps } from "./icon-props";

const HorizontalDotsIcon: FC<IconTypeProps> = ({ className }) => {
  return <Icon className={className} />;
};

export default HorizontalDotsIcon;
