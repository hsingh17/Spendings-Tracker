import { FC } from "react";
import UserIcon from "../../assets/components/UserIcon";
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

type UsernameInputProps = GenericFormInputProps & {
  withIcon?: boolean;
};

const UsernameInput: FC<UsernameInputProps> = ({
  title = "Username",
  name = "username",
  customStyles,
  withIcon = false,
  addformvalidators: addFormValidators,
}) => {
  const { setVal, errs } = useFormValidate(
    name,
    USERNAME_VALIDATORS,
    addFormValidators,
  );

  return (
    <div className={"mt-5"}>
      <label className="font-semibold text-slate-500">{title}</label>
      <div
        className={
          withIcon
            ? "flex flex-row items-center border-slate-500 border-2 p-1 rounded-xl focus-within:border-theme-cta focus-within:border-4"
            : ""
        }
      >
        {withIcon && <UserIcon className="scale-75" />}
        <GenericInputField
          className={customStyles}
          type="text"
          name={name}
          errs={errs}
          onChange={setVal}
        />
      </div>
    </div>
  );
};

export default UsernameInput;
