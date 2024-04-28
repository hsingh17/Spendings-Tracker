import { FC } from "react";

type GenericInputFieldProps = {
  type: string;
  name: string;
  className?: string;
};

const DEFAULT_CLASS_NAME =
  "font-semibold mt-1 p-1 border-2 border-slate-500 focus:outline-none focus:border-theme-cta rounded-lg w-full";
const GenericInputField: FC<GenericInputFieldProps> = ({
  className,
  name,
  type,
}) => {
  return (
    <input
      type={type}
      name={name}
      className={className || DEFAULT_CLASS_NAME}
    />
  );
};

export default GenericInputField;
