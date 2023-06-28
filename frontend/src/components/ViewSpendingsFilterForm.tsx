import { FC } from "react";
import { Constants } from "../utils/constants";
import { ViewSpendingsFilterFormProps } from "../utils/types";


const ViewSpendingsFilterForm: FC<ViewSpendingsFilterFormProps> = ({ parentSetSearchParams }) => {

  const processFilterForm = (e: React.FormEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      "start-date": { value: string };
      "end-date": { value: string };
      "limit": { value: string };
    }
    
    const urlSearchParams: URLSearchParams = new URLSearchParams();

    if (target["start-date"].value) {
      urlSearchParams.append("start-date", target["start-date"].value);
    }
    
    if (target["end-date"].value) {
      urlSearchParams.append("end-date", target["end-date"].value);
    }
    
    if (target["limit"].value) {
      urlSearchParams.append("limit", target["limit"].value);
    }

    parentSetSearchParams(urlSearchParams);
  };

  return (
    <form onSubmit={(e: React.FormEvent) => processFilterForm(e)} onReset={_ => parentSetSearchParams(new URLSearchParams())}>
        <label htmlFor={"start-date"}>Start Date:</label>
        <input type="date" id={"start-date"} name={"start-date"} />
        <br />

        <label htmlFor={"end-date"}>End Date:</label>
        <input type="date" id={"end-date"} name={"end-date"} />
        <br />
        
        <label htmlFor={"limit"}>Limit page to show:</label>
        <select name={"limit"}>
          {
            Constants.PAGE_LIMITS.map((limit: String, idx: number) => {
              return <option key={ `${limit}-${idx}` }>{limit}</option>
            })
          }
        </select>
        <br />

        <button type="submit">Search</button>
        <button type="reset">Reset filters</button>
      </form>
  );
};

export default ViewSpendingsFilterForm;