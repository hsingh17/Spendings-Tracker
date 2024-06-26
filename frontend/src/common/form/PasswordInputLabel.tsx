import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { SEND_PASSWORD_RESET_EMAIL_PAGE } from "../../utils/constants";

type PasswordInputLabelProps = {
  show: boolean;
  title: string;
};

const PasswordInputLabel: FC<PasswordInputLabelProps> = ({ show, title }) => {
  const navigate = useNavigate();
  return (
    <label className="flex flex-row font-semibold text-slate-500">
      <p>{title}</p>
      {show && (
        <p
          className="ml-auto text-slate-500 hover:cursor-pointer"
          onClick={() => navigate(SEND_PASSWORD_RESET_EMAIL_PAGE)}
        >
          Forgot password
        </p>
      )}
    </label>
  );
};

export default PasswordInputLabel;
