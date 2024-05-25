import { FC, useState } from "react";
import PasswordRequirements from "../../pages/create-acct/component/PasswordRequirements";
import { GenericFormInputProps } from "../../utils/types";
import GenericInputField from "./GenericInputField";
import PasswordInputLabel from "./PasswordInputLabel";
import ShowPasswordIcon from "./ShowPasswordIcon";

type PasswordInputProps = GenericFormInputProps & {
  showForgotPassword?: boolean;
  showPasswordReq?: boolean;
};

const PasswordInput: FC<PasswordInputProps> = ({
  title = "Password",
  name = "password",
  customStyles = "",
  showForgotPassword = false,
  showPasswordReq = false,
}) => {
  const [password, setPassword] = useState<string>("");
  const [, setIsValidPassword] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // console.log(isValidPassword); // TODO: Remove

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
