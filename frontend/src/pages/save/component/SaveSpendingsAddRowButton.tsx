import { FC } from "react";
import AddIcon from "../../../assets/components/AddIcon";

type SaveSpendingsAddRowButtonProps = {
  handleAddNewRow: (e: React.MouseEvent) => void;
};

const SaveSpendingsAddRowButton: FC<SaveSpendingsAddRowButtonProps> = ({
  handleAddNewRow,
}) => {
  return (
    <button
      className="flex justify-center w-full bg-theme-cta rounded-xl py-3 opacity-60 hover:opacity-80"
      onClick={(e: React.MouseEvent) => handleAddNewRow(e)}
    >
      <span className="flex flex-row items-center text-center">
        <AddIcon className="w-8 h-8 mt-1" />
        <p className="pl-1 text-xl font-[510]">Add</p>
      </span>
    </button>
  );
};

export default SaveSpendingsAddRowButton;
