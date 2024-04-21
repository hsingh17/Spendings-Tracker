import { FC, useState } from "react";
import GenericInputField from "./GenericInputField";
import PasswordInputLabel from "./PasswordInputLabel";
import ShowPasswordIcon from "./ShowPasswordIcon";

type PasswordInputProps = {
  title?: string;
  name?: string;
  customStyles?: string;
  showForgotPassword?: boolean;
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

      <GenericInputField
        name={name}
        type={showPassword ? "text" : "password"}
      />

      <ShowPasswordIcon
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
    </div>
  );
};

export default PasswordInput;
