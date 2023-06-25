import { FC } from "react";
import { Constants } from "../utils/constants";
import { ViewSpendingsFilterFormProps } from "../utils/types";


const ViewSpendingsFilterForm: FC<ViewSpendingsFilterFormProps> = ({ parentSetApiUrl }) => {

  const processFilterForm = (e: React.FormEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      "start-date": { value: string };
      "end-date": { value: string };
      "limit": { value: string };
    }
  };

  return (
    <form onSubmit={ (e: React.FormEvent) => processFilterForm(e) } onReset={ _ => resetFilters() }>
        <label htmlFor={Constants.FORM_START_DATE_KEY}>Start Date:</label>
        <input type="date" id={Constants.FORM_START_DATE_KEY} name={Constants.FORM_START_DATE_KEY} />
        <br />

        <label htmlFor={Constants.FORM_END_DATE_KEY}>End Date:</label>
        <input type="date" id={Constants.FORM_END_DATE_KEY} name={Constants.FORM_END_DATE_KEY} />
        <br />
        
        <label htmlFor={Constants.FORM_LIMIT_KEY}>Limit page to show:</label>
        <select name={Constants.FORM_LIMIT_KEY}>
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