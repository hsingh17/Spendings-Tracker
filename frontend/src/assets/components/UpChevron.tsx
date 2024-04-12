import { FC } from "react";
import { ReactComponent as Icon } from "../raw/down-chevron.svg";
import { IconTypeProps } from "./icon-props";

const UpChevron: FC<IconTypeProps> = ({ className }) => {
  return <Icon className={`${className} rotate-180`} />;
};

export default UpChevron;
