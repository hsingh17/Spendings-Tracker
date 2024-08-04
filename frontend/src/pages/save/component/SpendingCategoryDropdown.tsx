import { FC } from "react";
import { CategoriesMap, Spending } from "../../../utils/types";

type SpendingCategoryDropdownProps = {
  className: string;
  name: string;
  hasInputError: boolean;
  categoriesMap: CategoriesMap;
  spending: Spending;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SpendingCategoryDropdown: FC<SpendingCategoryDropdownProps> = ({
  className,
  name,
  hasInputError,
  categoriesMap,
  spending,
  onChange,
}) => {
  return (
    <>
      <label className="font-semibold text-slate-500">Category</label>
      <select
        className={`p-2 mt-2 rounded-lg border-4 ${className} ${hasInputError ? "border-red-500" : ""}`}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange(e)}
        name={name}
        defaultValue={spending?.category || "Choose category"}
      >
        <option value="Choose category" disabled hidden>
          Choose category
        </option>
        {Object.keys(categoriesMap).map((key) => {
          return (
            <option key={key} value={key} className="font-normal text-black">
              {key}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default SpendingCategoryDropdown;
