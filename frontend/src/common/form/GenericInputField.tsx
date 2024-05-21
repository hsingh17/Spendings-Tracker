import { Dispatch, FC, SetStateAction } from "react";

type GenericInputFieldProps = {
  type: string;
  name: string;
  className?: string;
  setPassword?: Dispatch<SetStateAction<string>>;
};

const DEFAULT_CLASS_NAME =
  "font-semibold mt-1 p-1 border-2 border-slate-500 focus:outline-none focus:border-theme-cta rounded-lg w-full";
const GenericInputField: FC<GenericInputFieldProps> = ({
  className,
  name,
  type,
  setPassword,
}) => {
  return (
    <input
      type={type}
      name={name}
      className={className || DEFAULT_CLASS_NAME}
      onChange={(e) => setPassword && setPassword(e.target.value)}
    />
  );
};

export default GenericInputField;
