import { FC } from "react";
import { ViewSpendingsButtonProps } from "../utils/types";

const ViewSpendingsButton: FC<ViewSpendingsButtonProps> = ({ parentSetSearchParams, buttonText, buttonUrl }) => {
  const showButton: boolean = buttonUrl !== null && buttonUrl !== null && buttonUrl !== undefined && buttonUrl !== undefined;
  const queryParams: string = buttonUrl ? buttonUrl.split("?")[1] : "";
  
  return (
    showButton
    ? <button onClick={_ => parentSetSearchParams(new URLSearchParams(queryParams))} disabled={!showButton}>{buttonText}</button>
    : null
  );
};

export default ViewSpendingsButton;