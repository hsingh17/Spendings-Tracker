import { FC, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { Constants } from "../utils/constants";
import { ProtectedRoutesProps, User } from "../utils/types";
import LoadingSpinner from "./LoadingSpinner";

const ProtectedRoute: FC<ProtectedRoutesProps> = ({ children }) => {
  const { setUser } = useContext(UserContext);
  const { loading, response } = useApi<User>(Constants.BASE_API_URL + Constants.ME_API_ROUTE, Constants.GET);
  
  useEffect(() => {
    if (!loading && response && response.ok && response.data) {
      setUser(response.data);
    }
  }, [loading, response]);

  // TODO: Loading and error response
  if (loading) {
    return <LoadingSpinner />;
  }

  if (!response || !response?.ok || !response.data) { // In case of error or bad response, we must route back to the Login Page
    return <Navigate to={ Constants.LOGIN_PAGE } replace={ true } />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;

