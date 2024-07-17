import { FC } from "react";
import { FormError } from "../../utils/types";

type GenericInputFieldErrorProps = {
  err: FormError;
  asListElement?: boolean;
};

const GenericInputFieldError: FC<GenericInputFieldErrorProps> = ({
  err,
  asListElement = true,
}) => {
  if (!err || err.valid) {
    return <></>;
  }

  return (
    <>
      {asListElement ? (
        <li className="text-red-600 font-semibold">{err.errMsg}</li>
      ) : (
        <span className="text-red-600 font-semibold">{err.errMsg}</span>
      )}
    </>
  );
};

export default GenericInputFieldError;
