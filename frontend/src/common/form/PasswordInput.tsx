import { FC, useState } from "react";
import PasswordIcon from "../../assets/components/PasswordIcon";
import useFormValidate from "../../hooks/useFormValidate";
import PasswordRequirements from "../../pages/create-acct/component/PasswordRequirements";
import {
  MAX_PASSWORD_LENGTH,
  REQ_PASSWORD_LENGTH,
} from "../../utils/constants";
import { FormValidator, GenericFormInputProps } from "../../utils/types";
import ConfirmPasswordInput from "./ConfirmPasswordInput";
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
  inputFieldStyle?: string;
  showForgotPassword?: boolean;
  showPasswordReq?: boolean;
  showConfirmPassword?: boolean;
  withIcon?: boolean;
};

const PasswordInput: FC<PasswordInputProps> = ({
  name = "password",
  title = "Password",
  customStyles = "",
  inputFieldStyle,
  showForgotPassword = false,
  showPasswordReq = false,
  showConfirmPassword = false,
  withIcon = false,
  addformvalidators: addFormValidators,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    val: password,
    errs,
    setVal,
    validate,
  } = useFormValidate(name, PASSWORD_VALIDATORS, addFormValidators);

  const onChange = (val: string) => {
    setVal(val);
    validate(val);
  };

  return (
    <>
      <div className={`relative ${customStyles}`}>
        <PasswordInputLabel title={title} show={showForgotPassword} />
        <GenericInputField
          className={inputFieldStyle}
          name={name}
          type={showPassword ? "text" : "password"}
          onChange={onChange}
          icon={withIcon && <PasswordIcon className="scale-75" />}
        />

        <ShowPasswordIcon
          withIcon={withIcon}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
      </div>

      <PasswordRequirements errs={errs} showPasswordReq={showPasswordReq} />

      <ConfirmPasswordInput
        title={`Confirm ${title}`}
        name={`confirm-${name}`}
        customStyles={customStyles}
        show={showConfirmPassword}
        password={password}
        addformvalidators={addFormValidators}
      />
    </>
  );
};

export default PasswordInput;
