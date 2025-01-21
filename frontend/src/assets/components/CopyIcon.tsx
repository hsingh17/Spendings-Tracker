import { FC } from "react";
import { ReactComponent as Icon } from "../raw/copy-icon.svg";
import { IconTypeProps } from "./icon-props";

const CopyIcon: FC<IconTypeProps> = ({ className }) => {
  return <Icon className={className} fill="white" />;
};

export default CopyIcon;
