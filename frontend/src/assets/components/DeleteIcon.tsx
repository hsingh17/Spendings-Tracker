import { FC } from "react";
import { ReactComponent as Icon } from "../raw/delete-icon.svg";
import { IconTypeProps } from "./icon-props";

const DeleteIcon: FC<IconTypeProps> = ({ className, stroke = "black" }) => {
  return <Icon className={className} stroke={stroke} />;
};

export default DeleteIcon;
