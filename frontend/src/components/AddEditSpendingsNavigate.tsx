import { FC, useEffect } from "react";
import { AddEditSpendingsNavigateProps} from "../utils/types";
import useApi from "../hooks/useApi";
import { Constants } from "../utils/constants";

const AddEditSpendingsNavigate: FC<AddEditSpendingsNavigateProps> = ({ spendingDate, spendings, parentSetSpendings, parentSetError }) => {
  const { loading, response } = useApi(Constants.BASE_API_URL + Constants.SPENDINGS_API_ROUTE + spendingDate, Constants.POST, JSON.stringify(spendings));
  useEffect(() => {
    if (!loading && (!response || !response.ok || !response.data)) {
      parentSetSpendings(null);
      parentSetError(response?.message ? response.message : null); // TODO
    }
  }, [loading, response]);

  // TODO 
  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!response?.message || !response.ok) {
    return <></>;
  }

  return (
    <>
      { response.message }
    </>
  );
};

export default AddEditSpendingsNavigate;