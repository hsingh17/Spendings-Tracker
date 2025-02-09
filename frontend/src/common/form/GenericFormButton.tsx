import { FC } from "react";

type GenericFormButtonProps = {
  value: string;
  disabled?: boolean;
  className?: string;
};

function getClassName(className: string, disabled: boolean) {
  return (
    className +
    (disabled ? " hover:cursor-default brightness-75" : " hover:cursor-pointer")
  );
}

const GenericFormButton: FC<GenericFormButtonProps> = ({
  value,
  disabled = false,
  className = "mt-5 w-full bg-theme-cta rounded-lg text-white font-bold px-3 py-2",
}) => {
  return (
    <button
      className={getClassName(className, disabled)}
      type="submit"
      disabled={disabled}
    >
      {value}
    </button>
  );
};

export default GenericFormButton;
