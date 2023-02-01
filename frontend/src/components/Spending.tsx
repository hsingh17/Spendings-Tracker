import { FC } from "react";
import { SpendingComponentProps } from "../utils/types"

const SpendingComponent: FC<SpendingComponentProps> = ({ spending }) => {
  return (
    <span>
      <p>{`Category: ${spending.category}. Amount: ${spending.amount}`}</p>
    </span>
  )
};

export default SpendingComponent;