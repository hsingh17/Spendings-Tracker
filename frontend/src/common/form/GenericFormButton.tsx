import { FC } from "react";

type GenericFormButtonProps = {
  value: string;
};

const GenericFormButton: FC<GenericFormButtonProps> = ({ value }) => {
  return (
    <input
      className="mt-5 w-full bg-theme-cta rounded-lg text-white font-bold px-3 py-2 hover:brightness-75 hover:cursor-pointer hover:"
      type="submit"
      value={value}
    />
  );
};

export default GenericFormButton;
