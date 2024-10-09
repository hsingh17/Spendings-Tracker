import React, { FC } from "react";
import { PAGE_LIMITS } from "../../../utils/constants";

type TablePageDropdownProps = {
  setSearchParams: (searchParams: URLSearchParams) => void;
};

const TablePageDropdown: FC<TablePageDropdownProps> = ({ setSearchParams }) => {
  const handleChange = (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & { value: string };
    setSearchParams(new URLSearchParams([["limit", target.value]]));
  };

  const getCurrentLimit = (): number => {
    const params = new URLSearchParams(document.location.search);
    return parseInt(params.get("limit") || "25");
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
        {PAGE_LIMITS.map((limit, idx) => {
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
