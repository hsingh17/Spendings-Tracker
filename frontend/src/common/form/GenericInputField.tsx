import React, { Dispatch, FC, SetStateAction } from "react";
import { FormError } from "../../utils/types";
import GenericInputFieldError from "./GenericInputFieldError";

type GenericInputFieldProps = {
  type: string;
  name: string;
  className?: string;
  errs?: FormError[];
  onChange?: Dispatch<SetStateAction<string>> | ((val: string) => void);
};

const GenericInputField: FC<GenericInputFieldProps> = ({
  className = "font-semibold mt-1 p-1 border-2 focus:outline-none focus:border-theme-cta rounded-lg w-full",
  name,
  type,
  errs,
  onChange,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // No spaces!
    if (e.code === "Space") {
      e.preventDefault();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (onChange) {
      onChange(val);
    }
  };

  console.log(className);

  return (
    <>
      <input
        type={type}
        name={name}
        className={className}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
          handleKeyDown(e)
        }
        onChange={(e) => handleChange(e)}
      />

      <ol>
        {errs?.map((err, idx) => {
          return <GenericInputFieldError key={idx + err.errMsg} err={err} />;
        })}
      </ol>
    </>
  );
};

export default GenericInputField;
