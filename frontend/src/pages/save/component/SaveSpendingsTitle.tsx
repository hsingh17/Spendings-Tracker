import React, { FC } from "react";
import { SaveSpendingsTitleProps } from "../../../utils/types";

const SaveSpendingsTitle: FC<SaveSpendingsTitleProps> = ({ date, isCreateMode, parentHandleDateChange }) => {
  const handleChange = (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      "value": string;
    };
    parentHandleDateChange(target.value);
  }

  return (
    <h1 className="text-3xl font-semibold text-slate-600">
    {`${
      isCreateMode ? "Create" : "Edit"
    } spendings for`}
    <input
      className="block md:inline mt-3 md:mt-0 w-full md:w-fit md:ml-2 bg-theme-white border-[3px] border-theme-cta rounded-lg px-2 py-1 text-theme-brand-secondary"
      type="date"
      id="spending-date"
      defaultValue={date}
      onChange={(e: React.FormEvent) => handleChange(e)}
    />
  </h1>
  );
};

export default SaveSpendingsTitle;