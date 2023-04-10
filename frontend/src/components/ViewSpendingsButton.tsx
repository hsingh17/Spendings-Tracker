import { FC } from "react";
import { ViewSpendingsButtonProps } from "../utils/types";

const ViewSpendingsButton: FC<ViewSpendingsButtonProps> = ({ parentSetApiUrl, buttonText, buttonUrl }) => {
  return (
    <button onClick={ _ => parentSetApiUrl(buttonUrl) } disabled={ buttonUrl === null }>{buttonText}</button>
  );
};

export default ViewSpendingsButton;