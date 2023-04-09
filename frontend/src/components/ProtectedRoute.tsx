import { FC, useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import useApi from "../hooks/useApi";
import { Constants } from "../utils/constants";
import { ProtectedRoutesProps, User } from "../utils/types";

const ProtectedRoute: FC<ProtectedRoutesProps> = ({ children }) => {
  const { setUser } = useContext(UserContext);
  const { loading, response } = useApi<User>(Constants.BASE_API_URL + Constants.ME_API_ROUTE, "GET");
  
  // TODO: Loading and error response
  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!response || !response.ok || !response.obj) { // In case of error or bad response, we must route back to the Login Page
    return <Navigate to={ Constants.LOGIN_PAGE } replace={ true } />;
  }

  // Response should be ok by this point 
  setUser(response.obj); // Set the user from API response
  
  return <>{children}</>;
};

export default ProtectedRoute;

