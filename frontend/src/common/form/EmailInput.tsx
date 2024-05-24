import { Dispatch, FC, SetStateAction, useState } from "react";
import { MAX_USERNAME_LENGTH } from "../../utils/constants";
import GenericInputField from "./GenericInputField";

type EmailValidator = {
  msg: string;
  validationFunc: (email: string) => boolean;
};

const EMAIL_VALIDATORS: EmailValidator[] = [
  {
    msg: "No special characters",
    validationFunc: (password): boolean =>
      !/[~`!@#$%^&*()_\-+={[}]|\\:;"'<,>.?]/.test(password),
  },
  {
    msg: `Username must not exceed ${MAX_USERNAME_LENGTH} characters long`,
    validationFunc: (email): boolean => email.length <= MAX_USERNAME_LENGTH,
  },
];

type EmailInputProps = {
  setIsFormValid?:
    | Dispatch<SetStateAction<boolean>>
    | ((valid: boolean) => void);
};

const EmailInput: FC<EmailInputProps> = ({ setIsFormValid }) => {
  const [errMsg, setErrMsg] = useState<string>();

  const onChange = (val: string) => {
    const valid = true;

    for (const emailValidator of EMAIL_VALIDATORS) {
      if (!emailValidator.validationFunc(val)) {
        setErrMsg(emailValidator.msg);
        break;
      }
    }

    if (setIsFormValid) {
      setIsFormValid(valid);
    }
  };

  return (
    <div className="mt-5">
      <label className="font-semibold text-slate-500">Email</label>
      <GenericInputField
        type="text"
        name="email"
        errMsg={errMsg}
        onChange={onChange}
      />
    </div>
  );
};

export default EmailInput;
