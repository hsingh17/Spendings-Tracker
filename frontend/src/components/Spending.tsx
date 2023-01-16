import { FC } from "react";
import { SpendingComponentProps } from "../utils/types"

const SpendingComponent: FC<SpendingComponentProps> = ({ spending }) => {
  return (
    <span>
      <p>{`Category: ${spending.category}. Amount: ${spending.amount}`}</p>
      <button>Edit</button>
    </span>
  )
};

export default SpendingComponent;