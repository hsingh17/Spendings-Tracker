import { FC } from "react";
import { FormError } from "../../utils/types";

type GenericInputFieldErrorProps = {
  err: FormError;
};

const GenericInputFieldError: FC<GenericInputFieldErrorProps> = ({ err }) => {
  if (err.valid) {
    return <></>;
  }

  return <li className="text-red-600 font-semibold">{err.errMsg}</li>;
};

export default GenericInputFieldError;
