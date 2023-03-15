import { FC } from "react";
import { SpendingsListProps } from "../utils/types";
import SpendingComponent from "./Spending";
import { Spending } from "../utils/types";
import { useNavigate } from "react-router-dom";


const SpendingsList: FC<SpendingsListProps> = ({ spendingDate, spendingsArray }) => {
  const navigate = useNavigate();
  
  const handleEdit = () => {
    navigate(`/edit-spendings/${spendingDate}`);
  };

  return (
    <>
      <h2>{ spendingDate }</h2>
      <button onClick={ () => {handleEdit()} }>Edit</button>
      {
        spendingsArray.map((spending: Spending) => {
          return <SpendingComponent key={ spending.spendingId } spending={ spending } />
        })
      }
    </>
  )
};

export default SpendingsList;