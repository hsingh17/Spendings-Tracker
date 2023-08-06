import { FC } from "react";
import { ViewSpendingsFilterFormProps } from "../utils/types";

const TableFilters: FC<ViewSpendingsFilterFormProps> = ({
  parentSetSearchParams,
  resetSearchParams
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
    // <form
    //   className="flex"
    //   onSubmit={(e: React.FormEvent) => processFilterForm(e)}
    //   onReset={_ => resetSearchParams()}
    // >
    //   <input type="date" id={"start-date"} name={"start-date"} />
    //   <p>to</p>
    //   <input type="date" id={"end-date"} name={"end-date"} />
    //   <button type="submit">Search</button>
    //   <button type="reset">Reset filters</button>
    // </form>
    null
  );
};

export default TableFilters;
