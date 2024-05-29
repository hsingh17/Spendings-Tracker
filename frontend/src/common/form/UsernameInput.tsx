import { FC } from "react";
import useFormValidate from "../../hooks/useFormValidate";
import { MAX_USERNAME_LENGTH } from "../../utils/constants";
import { FormValidator, GenericFormInputProps } from "../../utils/types";
import GenericInputField from "./GenericInputField";

const USERNAME_VALIDATORS: FormValidator[] = [
  {
    msg: `Username must not exceed ${MAX_USERNAME_LENGTH} characters`,
    validate: (username: string): boolean =>
      username.length <= MAX_USERNAME_LENGTH,
  },
  {
    msg: `Enter a username`,
    validate: (username: string): boolean => username.length > 0,
  },
];

const UsernameInput: FC<GenericFormInputProps> = ({
  title = "Username",
  name = "username",
  customStyles,
  addformvalidators: addFormValidators,
}) => {
  const { setVal, errs } = useFormValidate(
    name,
    USERNAME_VALIDATORS,
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

export default UsernameInput;
