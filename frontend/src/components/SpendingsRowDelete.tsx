import { FC, useEffect } from "react";
import { SpendingsRowDeleteProps } from "../utils/types";
import useApi from "../hooks/useApi";
import { Constants } from "../utils/constants";

const SpendingsRowDelete: FC<SpendingsRowDeleteProps> = ({ spendingDate, toggleRefresh }) => {
  const { loading, response } = useApi(Constants.BASE_API_URL + Constants.SPENDINGS_API_ROUTE + `/${spendingDate}`, Constants.DELETE);
  
  useEffect(() => {
    if (!loading && response && response.ok) {
      console.log(response)
      toggleRefresh();
    }

    // TODO: error handling
  }, [loading, response]);
  
  return <></>;
};

export default SpendingsRowDelete;