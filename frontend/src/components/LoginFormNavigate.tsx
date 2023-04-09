import { FC, useContext } from "react";
import { LoginFormNavigateProps, User } from "../utils/types";
import useApi from "../hooks/useApi";
import { Constants } from "../utils/constants";
import UserContext from "../contexts/UserContext";
import { Navigate } from "react-router-dom";

const LoginFormNavigate: FC<LoginFormNavigateProps> = ({ parentSetFormData, parentSetError, formData }) => {
  const { setUser } = useContext(UserContext);
  const { loading, response } = useApi<User>(Constants.BASE_API_URL + Constants.AUTH_LOGIN_ROUTE, Constants.POST, JSON.stringify(formData));
  
  if (loading) {
    return <h1>Logging you in...</h1>; // TODO: Something here like a loading animation of some kind 
  }

  if (!response || !response.obj || !response.ok) {
    parentSetFormData(null);
    parentSetError(response?.error ? response.error : "Something really bad happened!");
    return <></>;
  }

  // At this point response should be good
  setUser(response.obj);
  return <Navigate to={ Constants.DASHBOARD_PAGE } replace={ true }/>; // Successful login, reroute to the Dashboard
};

export default LoginFormNavigate;