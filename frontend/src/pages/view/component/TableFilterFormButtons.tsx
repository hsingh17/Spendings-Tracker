import React, { FC } from "react";

type TableFilterFormButtonsProps = {
  resetSearchParams: () => void;
};

const TableFilterFormButtons: FC<TableFilterFormButtonsProps> = ({
  resetSearchParams,
}) => {
  return (
    <>
      <button
        className="mt-6 w-full text-white bg-theme-cta py-2 font-semibold rounded-md"
        type="submit"
      >
        Apply Filters
      </button>

      <button
        className="mt-2 w-full"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          resetSearchParams();
        }}
      >
        Reset filters
      </button>
    </>
  );
};

export default TableFilterFormButtons;
