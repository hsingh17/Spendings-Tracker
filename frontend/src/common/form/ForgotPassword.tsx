import { useNavigate } from "react-router-dom";
import { SEND_PASSWORD_RESET_EMAIL_PAGE } from "../../utils/constants";

const ForgotPassword = () => {
  const navigate = useNavigate();
  return (
    <label className="flex flex-row font-semibold text-slate-500">
      <p>Password</p>
      <p
        className="ml-auto text-slate-500 hover:cursor-pointer"
        onClick={() => navigate(SEND_PASSWORD_RESET_EMAIL_PAGE)}
      >
        Forgot password
      </p>
    </label>
  );
};

export default ForgotPassword;
