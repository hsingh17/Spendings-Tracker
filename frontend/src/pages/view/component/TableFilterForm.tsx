import React, { FC } from "react";
import { ReactComponent as CloseIcon } from "../../../assets/raw/close-icon.svg";
import { TableFilterFormProps } from "../../../utils/types";

const TableFilterForm: FC<TableFilterFormProps> = ({
  isOpen,
  parentResetSearchParams,
  parentSetOpen,
  parentSetSearchParams,
}) => {
  const processFilterForm = (e: React.FormEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      "start-date": { value: string };
      "end-date": { value: string };
    };

    const urlSearchParams: URLSearchParams = new URLSearchParams();

    if (target["start-date"].value) {
      urlSearchParams.append("start-date", target["start-date"].value);
    }

    if (target["end-date"].value) {
      urlSearchParams.append("end-date", target["end-date"].value);
    }

    parentSetSearchParams(urlSearchParams);
  };

  return (
    <div
      className="top-12 w-full md:w-72 h-fit shadow-2xl border border-gray-300 rounded-xl bg-white absolute z-10"
      hidden={!isOpen}
    >
      <CloseIcon
        className="ml-auto w-7 h-7 absolute right-4 top-2 hover:cursor-pointer"
        onClick={(e: React.MouseEvent<SVGElement>) => parentSetOpen(e, false)}
      />

      <form
        className="flex flex-col p-5 mt-1"
        onSubmit={(e: React.FormEvent) => processFilterForm(e)}
        onReset={() => parentResetSearchParams()}
      >
        <div>
          <label className="block text-sm font-semibold" htmlFor="start-date">
            From
          </label>

          <input
            className="mt-1 w-full border border-gray-300 p-2 rounded"
            type="date"
            id={"start-date"}
            name={"start-date"}
          />
        </div>

        <div className="mt-5">
          <label className="block text-sm font-semibold" htmlFor="end-date">
            To
          </label>

          <input
            className="mt-1 w-full border border-gray-300 p-2 rounded"
            type="date"
            id={"end-date"}
            name={"end-date"}
          />
        </div>

        <button
          className="mt-6 w-full text-white bg-theme-cta py-2 font-semibold rounded-md"
          type="submit"
        >
          Apply Filters
        </button>

        <button className="mt-2 w-full" type="reset">
          Reset filters
        </button>
      </form>
    </div>
  );
};

export default TableFilterForm;
