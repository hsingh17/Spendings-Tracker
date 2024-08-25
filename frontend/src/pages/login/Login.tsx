import { Navigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import { DASHBOARD_PAGE } from "../../utils/constants";
import LoginForm from "./component/LoginForm";

const Login = () => {
  const { data: response } = useUser();

  if (response?.ok) {
    // Already logged in
    return <Navigate to={DASHBOARD_PAGE} />;
  }

  return <LoginForm />;
};

export default Login;
