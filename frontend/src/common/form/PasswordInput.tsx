import { FC, useState } from "react";
import useFormValidate from "../../hooks/useFormValidate";
import PasswordRequirements from "../../pages/create-acct/component/PasswordRequirements";
import {
  MAX_PASSWORD_LENGTH,
  REQ_PASSWORD_LENGTH,
} from "../../utils/constants";
import { FormValidator, GenericFormInputProps } from "../../utils/types";
import GenericInputField from "./GenericInputField";
import PasswordInputLabel from "./PasswordInputLabel";
import ShowPasswordIcon from "./ShowPasswordIcon";

const PASSWORD_VALIDATORS: FormValidator[] = [
  {
    msg: "A lowercase character",
    validate: (password): boolean => /[a-z]/.test(password),
  },
  {
    msg: "An uppercase character",
    validate: (password): boolean => /[A-Z]/.test(password),
  },
  {
    msg: "A number",
    validate: (password): boolean => /[0-9]/.test(password),
  },
  {
    msg: `Atleast ${REQ_PASSWORD_LENGTH} characters long`,
    validate: (password): boolean => password.length >= REQ_PASSWORD_LENGTH,
  },
  {
    msg: `${MAX_PASSWORD_LENGTH} max characters`,
    validate: (password): boolean => password.length <= MAX_PASSWORD_LENGTH,
  },
  {
    msg: "A special character",
    validate: (password): boolean =>
      /[~`!@#$%^&*()_\-+={[}]|\\:;"'<,>.?]/.test(password),
  },
];

type PasswordInputProps = GenericFormInputProps & {
  showForgotPassword?: boolean;
  showPasswordReq?: boolean;
  showConfirmPassword?: boolean;
};

const PasswordInput: FC<PasswordInputProps> = ({
  title = "Password",
  name = "password",
  customStyles = "",
  showForgotPassword = false,
  showPasswordReq = false,
  // showConfirmPassword = false,
  addformvalidators: addFormValidators,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { errs, setVal, validate } = useFormValidate(
    name,
    PASSWORD_VALIDATORS,
    addFormValidators,
  );

  const onChange = (val: string) => {
    setVal(val);
    validate(val);
  };

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
          onChange={onChange}
        />

        <ShowPasswordIcon
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
      </div>

      <PasswordRequirements errs={errs} showPasswordReq={showPasswordReq} />
    </>
  );
};

export default PasswordInput;
