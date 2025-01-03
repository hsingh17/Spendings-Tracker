import React, { FC, useRef, useState } from "react";
import useDetectClickOutsideComponent from "../../../hooks/useDetectOutsideComponent";
import { Nullable } from "../../../utils/types";
import TableFilterButton from "./TableFilterButton";
import TableFilterForm from "./TableFilterForm";

type TableFilterProps = {
  setSearchParams: (searchParams: URLSearchParams) => void;
  resetSearchParams: () => void;
};

const TableFilter: FC<TableFilterProps> = ({
  setSearchParams,
  resetSearchParams,
}) => {
  const filterFormRef = useRef<HTMLDivElement>(null);
  const filterButtonRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const setIsOpenWrapper = (e: Nullable<React.MouseEvent>, open: boolean) => {
    e?.preventDefault();
    setIsOpen(open);
  };

  useDetectClickOutsideComponent(
    [filterButtonRef, filterFormRef],
    setIsOpenWrapper
  );

  return (
    <div className="mt-5 relative">
      <div className="h-fit w-fit" ref={filterButtonRef}>
        <TableFilterButton isOpen={isOpen} setOpen={setIsOpenWrapper} />
      </div>

      <div ref={filterFormRef}>
        <TableFilterForm
          isOpen={isOpen}
          setOpen={setIsOpenWrapper}
          resetSearchParams={resetSearchParams}
          setSearchParams={setSearchParams}
        />
      </div>
    </div>
  );
};

export default TableFilter;
