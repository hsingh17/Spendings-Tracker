import { FC, useState } from "react";
import PasswordInputLabel from "./PasswordInputLabel";
import ShowPasswordIcon from "./ShowPasswordIcon";

type PasswordInputProps = {
  title?: string;
  name?: string;
  showForgotPassword: boolean;
  customStyles?: string;
};

const PasswordInput: FC<PasswordInputProps> = ({
  title = "Password",
  name = "password",
  showForgotPassword = true,
  customStyles = "",
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className={`relative ${customStyles}`}>
      <PasswordInputLabel
        title={title}
        showForgotPassword={showForgotPassword}
      />
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        className="font-semibold relative mt-1 p-1 border-2 border-slate-500 focus:outline-none focus:border-theme-cta rounded-lg w-full"
      />

      <ShowPasswordIcon
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
    </div>
  );
};

export default PasswordInput;
