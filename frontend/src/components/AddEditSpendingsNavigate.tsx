import { FC, useEffect } from "react";
import { AddEditSpendingsNavigateProps, GenericApiResponse } from "../utils/types";
import useApi from "../hooks/useApi";
import { Constants } from "../utils/constants";

const AddEditSpendingsNavigate: FC<AddEditSpendingsNavigateProps> = ({ spendings, parentSetSpendings, parentSetError }) => {
  const { loading, response } = useApi<GenericApiResponse>(Constants.BASE_API_URL + Constants.SAVE_SPENDING_API_ROUTE, Constants.POST, JSON.stringify(spendings));
  useEffect(() => {
    if (!loading && (!response || !response.ok || !response.obj)) {
      parentSetSpendings(null);
      parentSetError(response?.error ? response.error : "Something really bad happened!"); // TODO
    }
  }, [loading, response]);

  // TODO 
  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!response?.obj || !response.ok) {
    return <></>;
  }

  return (
    <>
      { response.obj.message }
    </>
  );
};

export default AddEditSpendingsNavigate;