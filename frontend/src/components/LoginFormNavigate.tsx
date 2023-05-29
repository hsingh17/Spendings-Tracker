import { FC, useContext, useEffect } from "react";
import { LoginFormNavigateProps, User } from "../utils/types";
import useApi from "../hooks/useApi";
import { Constants } from "../utils/constants";
import UserContext from "../contexts/UserContext";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner"

const LoginFormNavigate: FC<LoginFormNavigateProps> = ({ parentSetFormData, parentSetError, formData }) => {
  const { setUser } = useContext(UserContext);
  const { loading, response } = useApi<User>(Constants.BASE_API_URL + Constants.AUTH_LOGIN_ROUTE, Constants.POST, JSON.stringify(formData));

  useEffect(() => {
    if (!loading && response && response.ok && response.data) { // OK response
      setUser(response.data);
    } else if (!loading) { // Error
      parentSetFormData(null);
      parentSetError(response?.message ? response.message : "Something really bad happened!"); // TODO
    }
  }, [loading, response]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return <Navigate to={ Constants.DASHBOARD_PAGE } replace={ true }/>; // Successful login, reroute to the Dashboard
};

export default LoginFormNavigate;