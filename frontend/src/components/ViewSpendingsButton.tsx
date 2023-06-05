import { FC } from "react";
import { ViewSpendingsButtonProps } from "../utils/types";
import { Constants } from "../utils/constants";

const ViewSpendingsButton: FC<ViewSpendingsButtonProps> = ({ parentSetApiUrl, buttonText, buttonUrl }) => {
  if (!buttonUrl || buttonUrl === undefined) {
    return null;
  }

  return (
    <button onClick={ _ => parentSetApiUrl(Constants.BASE_API_URL + buttonUrl) } disabled={ buttonUrl === null }>{buttonText}</button>
  );
};

export default ViewSpendingsButton;