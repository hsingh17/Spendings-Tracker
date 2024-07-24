import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../../common/Card";
import useSaveSpendings from "../../../hooks/useSaveSpendings";
import useSpendingCategories from "../../../hooks/useSpendingCategories";
import {
  MAX_AMOUNT,
  MAX_CATEGORY_LENGTH,
  MAX_SPENDINGS_FOR_A_DAY,
} from "../../../utils/constants";
import DateUtils from "../../../utils/date-utils";
import {
  FormInputError,
  Nullable,
  Spending,
  SpendingFormInput,
} from "../../../utils/types";
import SaveSpendingsAddRowButton from "./SaveSpendingsAddRowButton";
import SaveSpendingsFooterButtons from "./SaveSpendingsFormFooterButtons";
import SaveSpendingsFormList from "./SaveSpendingsFormList";
import SaveSpendingsModal from "./SaveSpendingsModal";
import SaveSpendingsTitle from "./SaveSpendingsTitle";

type SaveSpendingsFormProps = {
  date: string;
  initialSpendings: Nullable<Spending[]>;
  isCreateMode: boolean;
  handleDateChange: (date: string) => void;
};

function spendingComparator(
  a: SpendingFormInput,
  b: SpendingFormInput,
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
  handleDateChange,
}) => {
  const [modalSpendingIdx, setModalSpendingIdx] = useState<number>();

  const mappedSpendings: Nullable<SpendingFormInput[]> = initialSpendings?.map(
    (spending) => ({
      spendingId: spending.spendingId,
      amount: spending.amount,
      category: spending.category,
      delete: spending.delete,
      categoryError: null,
      amountError: null,
    }),
  );
  const { data: response } = useSpendingCategories();
  const categoriesMap = response?.data?.categoryToS3UrlMap || {};

  const [spendings, setSpendings] = useState<SpendingFormInput[]>(
    mappedSpendings ? mappedSpendings.sort(spendingComparator) : [],
  );
  const navigate = useNavigate();
  const { mutate: saveSpendings } = useSaveSpendings(date, isCreateMode, () =>
    navigate(-1),
  );

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
        },
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

    saveSpendings({
      spendingRequests: mappedSpendings,
    });
  };

  const addNewSpending = (inputMap: Map<string, string>) => {
    const newSpendings: Array<SpendingFormInput> = [...spendings];
    const isValidIdx =
      modalSpendingIdx === 0 || (modalSpendingIdx && modalSpendingIdx >= 0);
    const spending = isValidIdx
      ? newSpendings[modalSpendingIdx!]
      : {
          spendingId: null,
          category: null,
          amount: null,
          delete: false,
          categoryError: null,
          amountError: null,
        };
    const newCategory = inputMap.get("category");
    const newAmountStr = inputMap.get("amount") || "0";
    const newAmount = Number.parseFloat(newAmountStr.replaceAll(",", ""));

    // Do updates
    spending.category = newCategory;
    spending.amount = newAmount;

    if (isValidIdx) {
      newSpendings[modalSpendingIdx!] = spending;
    } else {
      newSpendings.push(spending);
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

  const getSpendingForModal = (): Nullable<SpendingFormInput> => {
    if (modalSpendingIdx !== 0 && !modalSpendingIdx) {
      return null;
    }

    return modalSpendingIdx === -1
      ? {
          amount: 0,
          category: null,
          amountError: null,
          categoryError: null,
          delete: false,
          spendingId: null,
        }
      : spendings[modalSpendingIdx];
  };

  return (
    <div className="flex flex-col items-center mt-7">
      <Card className="items-center p-7 w-full md:w-[500px]">
        <SaveSpendingsTitle
          date={date || DateUtils.getCurrentDate()}
          handleDateChange={handleDateChange}
          spendings={spendings}
        />

        <SaveSpendingsFormList
          spendings={spendings}
          categoriesMap={categoriesMap}
          handleDeleteRow={handleDeleteRow}
          setModalSpendingIdx={setModalSpendingIdx}
        />

        <SaveSpendingsAddRowButton
          isDisabled={countSpendingsToDisplay() === MAX_SPENDINGS_FOR_A_DAY}
          setModalSpendingIdx={setModalSpendingIdx}
        />
      </Card>

      <SaveSpendingsFooterButtons
        isDisabled={spendings.length === 0}
        isCreateMode={isCreateMode}
        handleSubmit={handleSubmit}
      />

      <SaveSpendingsModal
        categoriesMap={categoriesMap}
        spending={getSpendingForModal()}
        setModalSpendingIdx={setModalSpendingIdx}
        onSubmit={addNewSpending}
      />
    </div>
  );
};

export default SaveSpendingsForm;
