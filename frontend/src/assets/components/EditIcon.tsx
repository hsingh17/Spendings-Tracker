import { FC } from "react";
import { ReactComponent as Icon } from "../raw/edit-icon.svg";
import { IconTypeProps } from "./icon-props";

const EditIcon: FC<IconTypeProps> = ({ className, stroke = "black" }) => {
  return <Icon className={className} stroke={stroke} />;
};

export default EditIcon;
