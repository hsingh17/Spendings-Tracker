import React, { Dispatch, FC, SetStateAction } from "react";

type GenericInputFieldProps = {
  type: string;
  name: string;
  className?: string;
  errMsg?: string;
  onChange?: Dispatch<SetStateAction<string>> | ((val: string) => void);
};

const DEFAULT_CLASS_NAME =
  "font-semibold mt-1 p-1 border-2 border-slate-500 focus:outline-none focus:border-theme-cta rounded-lg w-full";
const GenericInputField: FC<GenericInputFieldProps> = ({
  className,
  name,
  type,
  errMsg,
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
      <input
        type={type}
        name={name}
        className={className || DEFAULT_CLASS_NAME}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
          handleKeyDown(e)
        }
        onChange={(e) => handleChange(e)}
      />
      <span className="text-red-600">{errMsg}</span>
    </>
  );
};

export default GenericInputField;
