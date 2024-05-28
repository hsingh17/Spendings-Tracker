import { FC, useEffect, useState } from "react";
import useFormValidate from "../../hooks/useFormValidate";
import { FormValidator, GenericFormInputProps } from "../../utils/types";
import GenericInputField from "./GenericInputField";
import ShowPasswordIcon from "./ShowPasswordIcon";

type ConfirmPasswordInputProps = GenericFormInputProps & {
  show: boolean;
  password: string;
};

function getValidators(password: string): FormValidator[] {
  return [
    {
      msg: "Passwords must match",
      validate: (confirmPassword: string): boolean =>
        confirmPassword === password,
    },
  ];
}

const ConfirmPasswordInput: FC<ConfirmPasswordInputProps> = ({
  name = "confirm-password",
  title = "Confirm Password",
  password,
  show,
  customStyles,
  addformvalidators: addFormValidators,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { errs, setVal, setValidators } = useFormValidate(
    name,
    getValidators(password),
    addFormValidators,
  );

  if (!show) {
    return <></>;
  }

  useEffect(() => {
    setValidators(getValidators(password));
  }, [password]);

  return (
    <div className={`relative ${customStyles}`}>
      <label className="font-semibold text-slate-500">{title}</label>
      <GenericInputField
        type={showPassword ? "text" : "password"}
        name={name}
        errs={errs}
        onChange={setVal}
      />
      <ShowPasswordIcon
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
    </div>
  );
};

export default ConfirmPasswordInput;
