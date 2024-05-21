import { Dispatch, FC, SetStateAction, useState } from "react";
import GenericInputField from "./GenericInputField";
import PasswordInputLabel from "./PasswordInputLabel";
import ShowPasswordIcon from "./ShowPasswordIcon";

type PasswordInputProps = {
  title?: string;
  name?: string;
  customStyles?: string;
  showForgotPassword?: boolean;
  setPassword?: Dispatch<SetStateAction<string>>;
};

const PasswordInput: FC<PasswordInputProps> = ({
  title = "Password",
  name = "password",
  showForgotPassword = true,
  customStyles = "",
  setPassword,
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
        onChange={setPassword}
      />

      <ShowPasswordIcon
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
    </div>
  );
};

export default PasswordInput;
