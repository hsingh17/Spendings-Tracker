import { FC } from "react";

type GenericInputFieldIconProps = {
  icon?: React.ReactNode;
};

const GenericInputFieldIcon: FC<GenericInputFieldIconProps> = ({ icon }) => {
  if (!icon) {
    return <></>;
  }

  return (
    <>
      {icon}
      <div className="h-full w-[1px] bg-slate-300 py-[6px] mr-2">&nbsp;</div>
    </>
  );
};

export default GenericInputFieldIcon;
