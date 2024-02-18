import { FC } from "react";
import { ReactComponent as Icon } from "../raw/down-chevron.svg";
import { IconTypeProps } from "./icon-props";

const DownChevron: FC<IconTypeProps> = ({ className }) => {
  return <Icon className={className} />;
};

export default DownChevron;
