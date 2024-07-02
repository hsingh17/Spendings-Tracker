import { FC } from "react";
import { ReactComponent as Icon } from "../raw/add-icon.svg";
import { IconTypeProps } from "./icon-props";

const AddIcon: FC<IconTypeProps> = ({ className }) => {
  return <Icon className={className} />;
};

export default AddIcon;
