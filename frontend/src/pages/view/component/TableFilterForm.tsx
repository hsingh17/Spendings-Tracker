import React, { FC } from "react";
import { ReactComponent as CloseIcon } from "../../../assets/raw/close-icon.svg";
import GenericDatePicker from "../../../common/form/GenericDatePicker";
import GenericForm from "../../../common/form/GenericForm";
import TableFilterFormButtons from "./TableFilterFormButtons";

type TableFilterFormProps = {
  isOpen: boolean;
  setSearchParams: (searchParams: URLSearchParams) => void;
  resetSearchParams: () => void;
  setOpen: (e: React.MouseEvent, open: boolean) => void;
};

function getStartAndEndDateFromUrlParams(): (string | null | undefined)[] {
  const urlSearchParams = new URLSearchParams(location.search);
  return [urlSearchParams.get("start-date"), urlSearchParams.get("end-date")];
}

const TableFilterForm: FC<TableFilterFormProps> = ({
  isOpen,
  resetSearchParams,
  setOpen,
  setSearchParams,
}) => {
  const [startDate, endDate] = getStartAndEndDateFromUrlParams();

  const onSubmit = (inputMap: Map<string, string>) => {
    const startDate = inputMap.get("start-date");
    const endDate = inputMap.get("end-date");
    const urlSearchParams = new URLSearchParams();
    if (startDate) {
      urlSearchParams.append("start-date", startDate);
    }

    if (endDate) {
      urlSearchParams.append("end-date", endDate);
    }

    setSearchParams(urlSearchParams);
  };

  return (
    <div
      className="top-12 w-full md:w-72 h-fit shadow-2xl border bg-white absolute z-10"
      hidden={!isOpen}
    >
      <GenericForm
        formClassName="flex flex-col mt-1"
        title={""}
        beforeFormChildren={
          <CloseIcon
            className="ml-auto w-7 h-7 absolute right-4 top-2 hover:cursor-pointer"
            onClick={(e: React.MouseEvent<SVGElement>) => setOpen(e, false)}
          />
        }
        formChildren={
          <>
            <GenericDatePicker
              defaultDate={startDate}
              labelText={"From"}
              inputName={"start-date"}
            />

            <GenericDatePicker
              defaultDate={endDate}
              className="mt-5"
              labelText={"To"}
              inputName={"end-date"}
            />
            <TableFilterFormButtons resetSearchParams={resetSearchParams} />
          </>
        }
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default TableFilterForm;
