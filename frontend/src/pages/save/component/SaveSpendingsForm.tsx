import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../../common/Card";
import useSaveSpendings from "../../../hooks/useSaveSpendings";
import { SpendingDetailResponse } from "../../../hooks/useSpending";
import useSpendingCategories from "../../../hooks/useSpendingCategories";
import { MAX_SPENDINGS_FOR_A_DAY } from "../../../utils/constants";
import DateUtils from "../../../utils/date-utils";
import { ApiResponse, Nullable, Spending } from "../../../utils/types";
import SaveSpendingsAddRowButton from "./SaveSpendingsAddRowButton";
import SaveSpendingsFooterButtons from "./SaveSpendingsFormFooterButtons";
import SaveSpendingsFormList from "./SaveSpendingsFormList";
import SaveSpendingsModal from "./SaveSpendingsModal";
import SaveSpendingsTitle from "./SaveSpendingsTitle";

type SaveSpendingsFormProps = {
  date: Date;
  response?: ApiResponse<SpendingDetailResponse>;
  handleDateChange: (date: Date) => void;
};

const SaveSpendingsForm: FC<SaveSpendingsFormProps> = ({
  date,
  response,
  handleDateChange,
}) => {
  const navigate = useNavigate();
  const fetchedSpendings = response?.data?.spendings;
  const isCreateMode = !fetchedSpendings || fetchedSpendings.length === 0;
  const [modalSpendingIdx, setModalSpendingIdx] = useState<number>();
  const { data: categoriesResponse } = useSpendingCategories();
  const categoriesMap = categoriesResponse?.data?.categoryToS3UrlMap || {};
  const [spendings, setSpendings] = useState<Spending[]>(
    fetchedSpendings || [],
  );
  const { mutate: saveSpendings } = useSaveSpendings(date, isCreateMode);

  const countSpendingsToDisplay = () =>
    spendings.filter((spending) => !spending.delete).length;

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    const mappedSpendings: Spending[] = spendings.map((spending) => ({
      spendingId: spending.spendingId,
      amount: spending.amount,
      category: spending.category?.trim(),
      delete: spending.delete,
    }));

    saveSpendings({
      spendingRequests: mappedSpendings,
    });

    // Optimistic update. Assume spending will save
    navigate(-1);
  };

  const addNewSpending = (inputMap: Map<string, string>) => {
    const newSpendings: Spending[] = [...spendings];
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
    const newSpendings: Spending[] = [...spendings];

    if (newSpendings[idx].spendingId !== null) {
      newSpendings[idx].delete = true;
    } else {
      // Completely new spending that can be safely removed
      newSpendings.splice(idx, 1);
    }

    setSpendings(newSpendings);
  };

  const getSpendingForModal = (): Nullable<Spending> => {
    if (modalSpendingIdx !== 0 && !modalSpendingIdx) {
      return null;
    }

    return modalSpendingIdx === -1
      ? {
          amount: 0,
          category: null,
          delete: false,
          spendingId: null,
        }
      : spendings[modalSpendingIdx];
  };

  useEffect(() => {
    setSpendings(fetchedSpendings || []);
  }, [fetchedSpendings]);

  return (
    <div className="flex flex-col items-center md:mt-7 w-full md:w-fit">
      <Card className="items-center pb-5 md:p-7 w-full md:w-[500px]">
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
