import { FC } from "react";

type GenericFormButtonProps = {
  value: string;
  disabled?: boolean;
};

const GenericFormButton: FC<GenericFormButtonProps> = ({
  value,
  disabled = false,
}) => {
  return (
    <input
      className="mt-5 w-full bg-theme-cta rounded-lg text-white font-bold px-3 py-2 hover:brightness-75 hover:cursor-pointer hover:"
      type="submit"
      value={value}
      disabled={disabled}
    />
  );
};

export default GenericFormButton;
