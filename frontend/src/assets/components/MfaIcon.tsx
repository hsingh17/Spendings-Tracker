import { FC } from "react";
import { ReactComponent as Icon } from "../raw/mfa.svg";
import { IconTypeProps } from "./icon-props";

const MfaIcon: FC<IconTypeProps> = ({ className }) => {
  return <Icon className={className} />;
};

export default MfaIcon;
