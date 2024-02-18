import { FC } from "react";
import { ReactComponent as Icon } from "../raw/drag-drop-icon.svg";
import { IconTypeProps } from "./icon-props";

const DragDropIcon: FC<IconTypeProps> = ({ className }) => {
  return <Icon className={className} />;
};

export default DragDropIcon;
