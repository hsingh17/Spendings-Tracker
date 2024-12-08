import { FC } from "react";
import { FormError } from "../../utils/types";
import GenericInputFieldError from "./GenericInputFieldError";

type GenericInputFieldErrorsProps = {
  errs?: FormError[];
};

const GenericInputFieldErrors: FC<GenericInputFieldErrorsProps> = ({
  errs,
}) => {
  return (
    <ol>
      {errs?.map((err, idx) => {
        return <GenericInputFieldError key={idx + err.errMsg} err={err} />;
      })}
    </ol>
  );
};

export default GenericInputFieldErrors;
