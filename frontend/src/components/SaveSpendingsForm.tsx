import React, { FC, useEffect, useState } from "react";
import useSaveSpendings from "../hooks/useSaveSpendings";
import { Constants } from "../utils/constants";
import { Nullable, SaveSpendingsFormProps, Spending } from "../utils/types";
import FormInputColumns from "./FormInputColumns";
import Card from "./Card";
import { ReactComponent as AddRow } from "../assets/raw/add-row.svg";
import { useNavigate } from "react-router-dom";

function spendingComparator(a: Spending, b: Spending): number {
  const aCategory: Nullable<string> = a.category;
  const bCategory: Nullable<string> = b.category;

  if (!aCategory || !bCategory) {
    return !aCategory ? -1 : 1;
  }

  if (aCategory !== bCategory) {
    return aCategory < bCategory ? -1 : 1;
  }

  const aAmount: Nullable<number> = a.amount;
  const bAmount: Nullable<number> = b.amount;

  if (!aAmount || !bAmount) {
    return !aAmount ? -1 : 1;
  }

  return aAmount < bAmount ? -1 : 1;
}

const SaveSpendingsForm: FC<SaveSpendingsFormProps> = ({
  date,
  isCreateMode,
  initialSpendings,
}) => {
  const [spendings, setSpendings] = useState<Array<Spending>>(
    initialSpendings ? initialSpendings.sort(spendingComparator) : []
  );
  const navigate = useNavigate();
  const { mutate } = useSaveSpendings(date, isCreateMode, () => navigate(-1));

  useEffect(() => {
    setSpendings(initialSpendings ? initialSpendings : []);
  }, [initialSpendings]);

  const countSpendingsToDisplay = () =>
    spendings.filter((spending) => !spending.delete).length;

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    // TODO: Input validation
    mutate(spendings);
  };

  const handleAddNewRow = (e: React.MouseEvent) => {
    e.preventDefault();

    if (countSpendingsToDisplay() >= Constants.MAX_SPENDINGS_FOR_A_DAY) {
      // No more spendings allowed for the day
      alert("Reached maximum spendings for a day!"); // TODO: Replace
      return;
    }

    let newSpendings: Array<Spending> = [...spendings];
    newSpendings.push({
      spendingId: null,
      category: null,
      amount: null,
      delete: false,
    });
    setSpendings(newSpendings);
  };

  const handleDeleteRow = (idx: number) => {
    let newSpendings: Array<Spending> = [...spendings];
    if (newSpendings[idx].spendingId !== null) {
      newSpendings[idx].delete = true;
    } else {
      // Completely new spending that can be safely removed
      newSpendings.splice(idx, 1);
    }

    setSpendings(newSpendings);
  };

  const handleChange = (idx: number, newSpending: Spending) => {
    let newSpendings: Array<Spending> = [...spendings];
    newSpendings[idx] = newSpending;
    setSpendings(newSpendings);
  };

  return (
    <div className="flex flex-col items-center mt-7">
      <Card itemsCenter={true}>
        <FormInputColumns
          spendings={spendings}
          parentHandleChange={handleChange}
          parentHandleDeleteRow={handleDeleteRow}
        />

        <button
          className="flex justify-center mt-1"
          onClick={(e: React.MouseEvent) => handleAddNewRow(e)}
        >
          <AddRow className="w-10 h-10 opacity-50 hover:opacity-80" />
        </button>
      </Card>

      <div className="ml-auto mt-5">
        <button
          className="mr-4 text-slate-600 text-lg"
          onClick={(e: React.MouseEvent) => navigate(-1)}
        >
          Cancel
        </button>
        <button
          className="bg-theme-cta px-5 py-2 text-white font-semibold rounded-xl hover:cursor-pointer text-lg"
          onClick={(e: React.MouseEvent) => handleSubmit(e)}
        >
          {isCreateMode ? "Create" : "Update"}
        </button>
      </div>
    </div>
  );
};

export default SaveSpendingsForm;
