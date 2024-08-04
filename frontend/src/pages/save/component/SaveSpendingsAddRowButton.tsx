import { Dispatch, FC, SetStateAction } from "react";
import AddIcon from "../../../assets/components/AddIcon";

type SaveSpendingsAddRowButtonProps = {
  isDisabled: boolean;
  setModalSpendingIdx: Dispatch<SetStateAction<number | undefined>>;
};

const ENABLED_STYLE = "bg-theme-cta opacity-60";
const DISABLED_STYLE = "bg-red-500 text-white";

const SaveSpendingsAddRowButton: FC<SaveSpendingsAddRowButtonProps> = ({
  isDisabled,
  setModalSpendingIdx,
}) => {
  return (
    <>
      <button
        disabled={isDisabled}
        className={`flex justify-center w-11/12 md:w-full rounded-xl py-3 ${isDisabled ? DISABLED_STYLE : ENABLED_STYLE}`}
        onClick={() => setModalSpendingIdx(-1)}
      >
        <span className="flex flex-row items-center text-center">
          {!isDisabled && <AddIcon className="w-8 h-8 mt-1" />}
          <p className="pl-1 text-xl font-[510]">
            {isDisabled ? "No more spendings can be added for this day" : "Add"}
          </p>
        </span>
      </button>
    </>
  );
};

export default SaveSpendingsAddRowButton;
