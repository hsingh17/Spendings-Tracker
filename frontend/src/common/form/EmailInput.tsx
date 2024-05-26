import { FC } from "react";
import useFormValidate from "../../hooks/useFormValidate";
import { MAX_EMAIL_LENGTH } from "../../utils/constants";
import { FormValidator, GenericFormInputProps } from "../../utils/types";
import GenericInputField from "./GenericInputField";

const EMAIL_VALIDATORS: FormValidator[] = [
  {
    msg: `Email must not exceed ${MAX_EMAIL_LENGTH} characters`,
    validate: (email: string): boolean => email.length <= MAX_EMAIL_LENGTH,
  },
  {
    msg: `Enter an email`,
    validate: (email: string): boolean => email.length > 0,
  },
];

const EmailInput: FC<GenericFormInputProps> = ({
  title = "Email",
  name = "email",
  customStyles,
  addformvalidators: addFormValidators,
}) => {
  const { setVal, errs } = useFormValidate(
    name,
    EMAIL_VALIDATORS,
    addFormValidators,
  );

  return (
    <div className={`mt-5 ${customStyles}`}>
      <label className="font-semibold text-slate-500">{title}</label>
      <GenericInputField
        type="text"
        name={name}
        errs={errs}
        onChange={setVal}
      />
    </div>
  );
};

export default EmailInput;
