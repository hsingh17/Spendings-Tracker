import { FC } from "react";

type GenericFormButtonProps = {
  value: string;
  disabled?: boolean;
  className?: string;
};

const GenericFormButton: FC<GenericFormButtonProps> = ({
  value,
  disabled = false,
  className = "mt-5 w-full bg-theme-cta rounded-lg text-white font-bold px-3 py-2 hover:brightness-75 hover:cursor-pointer",
}) => {
  return (
    <input
      className={className}
      type="submit"
      value={value}
      disabled={disabled}
    />
  );
};

export default GenericFormButton;
