import React, { Dispatch, FC, SetStateAction } from "react";
import { FormError } from "../../utils/types";
import GenericInputFieldErrors from "./GenericInputFieldErrors";
import GenericInputFieldIcon from "./GenericInputFieldIcon";

type GenericInputFieldProps = {
  type: string;
  name: string;
  className?: string;
  errs?: FormError[];
  icon?: React.ReactNode;
  onChange?: Dispatch<SetStateAction<string>> | ((val: string) => void);
};

const GenericInputField: FC<GenericInputFieldProps> = ({
  className = "font-semibold mt-1 p-1 border-2 focus:outline-none focus:border-theme-cta rounded-lg w-full",
  name,
  type,
  errs,
  icon,
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

  return (
    <>
      <div
        className={
          icon
            ? "flex flex-row items-center border-slate-500 border-2 p-1 rounded-xl focus-within:border-theme-cta focus-within:border-4"
            : ""
        }
      >
        <GenericInputFieldIcon icon={icon} />
        <input
          type={type}
          name={name}
          className={
            icon
              ? "outline-none font-semibold text-lg mt-1 p-1 border-0 w-full"
              : className
          }
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            handleKeyDown(e)
          }
          onChange={(e) => handleChange(e)}
        />
      </div>

      <GenericInputFieldErrors errs={errs} />
    </>
  );
};

export default GenericInputField;
