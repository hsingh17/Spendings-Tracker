import React, { FC, useRef, useState } from "react";
import useDetectClickOutsideComponent from "../../../hooks/useDetectOutsideComponent";
import { Nullable, TableFilterProps } from "../../../utils/types";
import TableFilterButton from "./TableFilterButton";
import TableFilterForm from "./TableFilterForm";

const TableFilter: FC<TableFilterProps> = ({
  isLoading,
  parentSetSearchParams,
  parentResetSearchParams,
}) => {
  const filterFormRef = useRef<HTMLDivElement>(null);
  const filterButtonRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const setIsOpenWrapper = (e: Nullable<React.MouseEvent>, open: boolean) => {
    if (e) {
      e.preventDefault();
    }

    setIsOpen(open);
  };

  useDetectClickOutsideComponent(
    [filterButtonRef, filterFormRef],
    setIsOpenWrapper,
  );

  if (isLoading) {
    return null;
  }

  return (
    <div className="mt-5 relative">
      <div className="h-fit w-fit" ref={filterButtonRef}>
        <TableFilterButton isOpen={isOpen} parentSetOpen={setIsOpenWrapper} />
      </div>

      <div ref={filterFormRef}>
        <TableFilterForm
          isOpen={isOpen}
          parentSetOpen={setIsOpenWrapper}
          parentResetSearchParams={parentResetSearchParams}
          parentSetSearchParams={parentSetSearchParams}
        />
      </div>
    </div>
  );
};

export default TableFilter;
