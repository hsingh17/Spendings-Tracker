import { FC, useState } from "react";
import PasswordRequirements from "../../pages/create-acct/component/PasswordRequirements";
import GenericInputField from "./GenericInputField";
import PasswordInputLabel from "./PasswordInputLabel";
import ShowPasswordIcon from "./ShowPasswordIcon";

type PasswordInputProps = {
  title?: string;
  name?: string;
  customStyles?: string;
  showForgotPassword?: boolean;
  showPasswordReq?: boolean;
};

const PasswordInput: FC<PasswordInputProps> = ({
  title = "Password",
  name = "password",
  showForgotPassword = false,
  showPasswordReq = false,
  customStyles = "",
}) => {
  const [password, setPassword] = useState<string>("");
  const [isValidPassword, setIsValidPassword] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  console.log(isValidPassword); // TODO: Remove

  return (
    <>
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

      <PasswordRequirements
        password={password}
        showPasswordReq={showPasswordReq}
        setIsValid={setIsValidPassword}
      />
    </>
  );
};

export default PasswordInput;
