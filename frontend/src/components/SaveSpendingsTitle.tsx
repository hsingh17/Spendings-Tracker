import React, { FC } from "react";
import { SaveSpendingsTitleProps } from "../utils/types";

const SaveSpendingsTitle: FC<SaveSpendingsTitleProps> = ({ date, isCreateMode, parentHandleDateChange }) => {
  const handleChange = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO

    parentHandleDateChange("TODO");
  }

  return (
    <h1 className="text-3xl font-semibold text-slate-600">
    {`${
      isCreateMode ? "Create" : "Edit"
    } spendings for`}
    <input
      className="ml-2 bg-theme-white border-[3px] border-theme-cta rounded-lg px-2 py-1 text-theme-brand-secondary"
      type="date"
      id="spending-date"
      defaultValue={date}
      onChange={(e: React.FormEvent) => handleChange(e)}
    />
  </h1>
  );
};

export default SaveSpendingsTitle;