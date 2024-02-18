import React, { FC } from "react";
import { Constants } from "../../../utils/constants";
import { Nullable, TablePageDropdownProps } from "../../../utils/types";

const TablePageDropdown: FC<TablePageDropdownProps> = ({
  parentSetSearchParams,
}) => {
  const handleChange = (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & { value: string };
    parentSetSearchParams(new URLSearchParams(`limit=${target.value}`));
  };

  const getCurrentLimit = (): number => {
    const params = new URLSearchParams(document.location.search);
    const limitStr: Nullable<string> = params.get("limit");
    return limitStr ? parseInt(limitStr) : 25;
  };

  return (
    <div className="bg-theme-neutral mr-5 flex items-center justify-center flex-col md:flex-row">
      <label htmlFor="limit" className="text-md font-semibold text-gray-400">
        Show
      </label>

      <select
        className="ml-2 py-1 px-2 bg-white border-gray-300 border-2 rounded-lg hover:cursor-pointer"
        id="limit"
        name="limit"
        defaultValue={getCurrentLimit()}
        onChange={(e: React.ChangeEvent) => handleChange(e)}
      >
        {Constants.PAGE_LIMITS.map((limit, idx) => {
          return (
            <option key={idx} value={limit}>
              {limit}
            </option>
          );
        })}
      </select>

      <p className="text-md font-semibold text-gray-400 ml-2">items</p>
    </div>
  );
};

export default TablePageDropdown;
