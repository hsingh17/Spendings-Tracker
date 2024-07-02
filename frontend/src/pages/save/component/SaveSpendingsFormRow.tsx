import { FC } from "react";
import { ReactComponent as DeleteRowIcon } from "../../../assets/raw/delete-icon.svg";
import MoneyUtils from "../../../utils/money-utils";
import { CategoriesMap, SpendingFormInput } from "../../../utils/types";

export type SpendingsFormRowProps = {
  idx: number;
  spending: SpendingFormInput;
  categoriesMap: CategoriesMap;
  handleDeleteRow: (idx: number) => void;
};

const SaveSpendingsFormRow: FC<SpendingsFormRowProps> = ({
  idx,
  spending,
  categoriesMap,
  handleDeleteRow,
}) => {
  if (spending.delete) {
    // SpendingFormInput marked for deletion
    return <></>;
  }

  return (
    <div className="relative flex flex-row items-center mt-1 w-full p-1 rounded-xl hover:bg-slate-300 hover:bg-opacity-20 hover:cursor-pointer">
      <img
        src={categoriesMap[spending.category || ""]}
        className="w-10 h-10 stroke-black scale-100"
        onMouseOver={() => {
          alert(spending.category); // TODO: show tooltip
        }}
      />

      <p className="ml-2 mb-[2px] font-semibold text-xl">
        {MoneyUtils.formatMoneyUsd(spending.amount)}
      </p>

      <button className="ml-auto mr-2" onClick={() => handleDeleteRow(idx)}>
        <DeleteRowIcon
          className="w-10 h-10 p-1 rounded-lg hover:bg-slate-400 hover:bg-opacity-35"
          stroke="red"
        />
      </button>
    </div>
  );
};

export default SaveSpendingsFormRow;
