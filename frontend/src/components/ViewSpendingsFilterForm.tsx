import { FC } from "react";
import { Constants } from "../utils/constants";
import { ViewSpendingsFilterFormProps } from "../utils/types";


const ViewSpendingsFilterForm: FC<ViewSpendingsFilterFormProps> = ({ parentSetApiUrl }) => {

  const processFilterForm = (e: React.FormEvent) => {
    const target = e.target as typeof e.target & {
      "start-date": { value: string };
      "end-date": { value: string };
      "limit": { value: string };
    }

    // TODO: Validate input (?) 
    const formInput: Record<string, string> = { "start-date": target["start-date"].value , "end-date": target["end-date"].value, "limit": target["limit"].value };
    const apiUrl = new URL(Constants.BASE_API_URL + Constants.GET_SPENDING_API_ROUTE);

    Object.entries(formInput).forEach((pair) => {
      if (!pair[1]) { // Null value (aka user did not put anything for this filter)
        return;
      }
      apiUrl.searchParams.append(pair[0], pair[1]);
    });

    parentSetApiUrl(apiUrl.toString());
  };

  const resetFilters = () => {
    parentSetApiUrl(Constants.BASE_API_URL + Constants.GET_SPENDING_API_ROUTE);
  };

  return (
    <form onSubmit={ (e: React.FormEvent) => processFilterForm(e) } onReset={ _ => resetFilters() }>
        <label htmlFor="start-date">Start Date:</label>
        <input type="date" id="start-date" name="start-date" />
        <br />

        <label htmlFor="end-date">End Date:</label>
        <input type="date" id="end-date" name="end-date" />
        <br />
        
        <label htmlFor="limit">Limit page to show:</label>
        <select name="limit">
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