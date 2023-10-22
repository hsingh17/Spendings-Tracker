import { Navigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import useUser from "../hooks/useUser";
import { Constants } from "../utils/constants";

const Login = () => {
  const { data: response } = useUser();
 
  if (response?.ok) { // Already logged in
    return <Navigate to={Constants.DASHBOARD_PAGE} />;
  }

  return <LoginForm />;
};

export default Login;
