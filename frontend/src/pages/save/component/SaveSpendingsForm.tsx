import React, { FC, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ReactComponent as AddRow } from "../../../assets/raw/add-row.svg";
import Card from "../../../common/Card";
import useSaveSpendings from "../../../hooks/useSaveSpendings";
import {
  MAX_AMOUNT,
  MAX_CATEGORY_LENGTH,
  MAX_SPENDINGS_FOR_A_DAY,
} from "../../../utils/constants";
import {
  FormInputError,
  Nullable,
  SaveSpendingsFormProps,
  Spending,
  SpendingFormInput,
} from "../../../utils/types";
import FormInputColumns from "./FormInputColumns";

function spendingComparator(
  a: SpendingFormInput,
  b: SpendingFormInput
): number {
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
  const mappedSpendings: Nullable<Array<SpendingFormInput>> =
    initialSpendings?.map((spending) => ({
      spendingId: spending.spendingId,
      amount: spending.amount,
      category: spending.category,
      delete: spending.delete,
      categoryError: null,
      amountError: null,
    }));

  const [spendings, setSpendings] = useState<Array<SpendingFormInput>>(
    mappedSpendings ? mappedSpendings.sort(spendingComparator) : []
  );

  const cardRef = useRef<HTMLDivElement>();
  const navigate = useNavigate();
  const { mutate } = useSaveSpendings(date, isCreateMode, () => navigate(-1));

  useEffect(() => {
    setSpendings(mappedSpendings ? mappedSpendings : []);
  }, [initialSpendings]);

  const countSpendingsToDisplay = () =>
    spendings.filter((SpendingFormInput) => !SpendingFormInput.delete).length;

  const handleSubmit = (e: React.MouseEvent) => {
    const isValidFormInput = (): boolean => {
      let isValid: boolean = true;
      const validatedSpendings: Array<SpendingFormInput> = spendings.map(
        (spending) => {
          const newSpending: SpendingFormInput = { ...spending };
          newSpending.categoryError = null;
          newSpending.amountError = null;

          if (
            !newSpending.category ||
            newSpending.category.trim().length === 0
          ) {
            newSpending.categoryError = FormInputError.EMPTY_CATEGORY;
          } else if (newSpending.category.length > MAX_CATEGORY_LENGTH) {
            newSpending.categoryError = FormInputError.MAX_CATEGORY_LENGTH;
          }

          if (!newSpending.amount || newSpending.amount === 0) {
            newSpending.amountError = FormInputError.ZERO_AMOUNT;
          } else if (newSpending.amount >= MAX_AMOUNT) {
            newSpending.amountError = FormInputError.MAX_AMOUNT;
          }

          if (newSpending.categoryError || newSpending.amountError) {
            isValid = false; // Can do this inline but TypeScript warning/error makes it look uglier than this
          }

          return newSpending;
        }
      );

      // Make sure no duplicate category names
      const map: Map<string, SpendingFormInput[]> = new Map();
      validatedSpendings.forEach((value) => {
        const category = value.category;
        if (!category) {
          return;
        }

        const mapList: SpendingFormInput[] | undefined = map.get(category);

        if (!mapList) {
          map.set(category, [value]);
        } else {
          mapList.push(value);
        }
      });

      for (const [, spendingList] of map.entries()) {
        if (spendingList.length === 1) {
          continue;
        }

        // Duplicated categories. Iterate through all the offending ones and mark
        for (const spendingFormInput of spendingList) {
          spendingFormInput.categoryError = FormInputError.DUPLICATE_CATEGORY;
        }

        isValid = false;
      }

      if (!isValid) {
        setSpendings(validatedSpendings);
      }

      return isValid;
    };

    e.preventDefault();
    if (!isValidFormInput()) {
      return;
    }

    const mappedSpendings: Array<Spending> = spendings.map((spending) => ({
      spendingId: spending.spendingId,
      amount: spending.amount,
      category: spending.category?.trim(),
      delete: spending.delete,
    }));

    mutate({
      spendingRequests: mappedSpendings,
    });
  };

  const handleAddNewRow = (e: React.MouseEvent) => {
    e.preventDefault();

    if (countSpendingsToDisplay() >= MAX_SPENDINGS_FOR_A_DAY) {
      // No more spendings allowed for the day
      toast.error("Reached maximum spendings for a day!");
      return;
    }

    const newSpendings: Array<SpendingFormInput> = [...spendings];
    newSpendings.push({
      spendingId: null,
      category: null,
      amount: null,
      delete: false,
      categoryError: null,
      amountError: null,
    });

    if (cardRef.current) {
      // Auto scroll user down to bottom of the card
      window.scrollTo({
        top: cardRef.current.scrollHeight + 100, // + 100 for a little padding
        behavior: "smooth",
      });
    }

    setSpendings(newSpendings);
  };

  const handleDeleteRow = (idx: number) => {
    const newSpendings: Array<SpendingFormInput> = [...spendings];
    if (newSpendings[idx].spendingId !== null) {
      newSpendings[idx].delete = true;
    } else {
      // Completely new SpendingFormInput that can be safely removed
      newSpendings.splice(idx, 1);
    }

    setSpendings(newSpendings);
  };

  const handleChange = (idx: number, newSpending: SpendingFormInput) => {
    const newSpendings: Array<SpendingFormInput> = [...spendings];
    newSpendings[idx] = newSpending;
    setSpendings(newSpendings);
  };

  return (
    <div className="flex flex-col items-center mt-7">
      <Card customStyles="items-center p-7" innerRef={cardRef}>
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
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
        <button
          className="bg-theme-cta px-5 py-2 text-white font-semibold rounded-xl hover:cursor-pointer text-lg disabled:opacity-25"
          disabled={spendings.length === 0}
          onClick={(e: React.MouseEvent) => handleSubmit(e)}
        >
          {isCreateMode ? "Create" : "Update"}
        </button>
      </div>
    </div>
  );
};

export default SaveSpendingsForm;
