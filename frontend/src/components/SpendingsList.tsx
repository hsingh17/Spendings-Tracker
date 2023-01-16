import { FC } from "react";
import { SpendingsListProps } from "../utils/types";
import SpendingComponent from "./Spending";
import { Spending } from "../utils/types";

const SpendingsList: FC<SpendingsListProps> = ({ spendingsArray }) => {
  return (
    <>
      {
        spendingsArray.map((spending: Spending) => {
          return <SpendingComponent key={ spending.id } spending={ spending } />
        })
      }
    </>
  )
};

export default SpendingsList;