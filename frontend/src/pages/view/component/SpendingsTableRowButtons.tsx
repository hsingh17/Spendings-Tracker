import { FC } from "react";
import DeleteIcon from "../../../assets/components/DeleteIcon";
import EditIcon from "../../../assets/components/EditIcon";
import { SpendingListRow } from "../../../utils/types";

type SpendingsTableRowButtonsProps = {
  spending: SpendingListRow;
  setSpendingToDelete: (spending: SpendingListRow) => void;
  handleEdit: () => void;
};

const SpendingsTableRowButtons: FC<SpendingsTableRowButtonsProps> = ({
  spending,
  handleEdit,
  setSpendingToDelete,
}) => {
  return (
    <td>
      <div className="flex justify-center items-center w-full">
        <button onClick={() => handleEdit()}>
          <EditIcon className="h-7 w-7 mr-5" stroke={"#40A3E6"} />
        </button>

        <button onClick={() => setSpendingToDelete(spending)}>
          <DeleteIcon className="h-7 w-7" stroke={"red"} />
        </button>
      </div>
    </td>
  );
};

export default SpendingsTableRowButtons;
