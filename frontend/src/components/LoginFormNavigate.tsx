import { FC, useContext, useEffect } from "react";
import { LoginFormNavigateProps, User } from "../utils/types";
import useApi from "../hooks/useApi";
import { Constants } from "../utils/constants";
import UserContext from "../contexts/UserContext";
import { Navigate } from "react-router-dom";

const LoginFormNavigate: FC<LoginFormNavigateProps> = ({ formData }) => {
  const { setUser } = useContext(UserContext);
  const { response } = useApi<User>(Constants.BASE_API_URL + Constants.AUTH_LOGIN_ROUTE, Constants.POST, JSON.stringify(formData));
  // useEffect(() => {
  //   if (response && response.ok && response.data) { // OK response
  //     setUser(response.data);
  //   }
  // }, [response]);

  return <Navigate to={ Constants.DASHBOARD_PAGE } replace={ true } />;
};

export default LoginFormNavigate;