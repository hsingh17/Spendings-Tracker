import { FC, ReactNode } from "react";

export type SettingsSubsectionProps = {
  subsectionTitle: string;
  description: string;
  children: ReactNode;
  showHorizontalRule?: boolean;
};

const SettingsSubsection: FC<SettingsSubsectionProps> = ({
  subsectionTitle,
  description,
  children,
  showHorizontalRule = true,
}) => {
  return (
    <>
      <h1 className="text-lg font-bold text-theme-brand">{subsectionTitle}</h1>
      <h1 className="text-sm text-gray-500 font-semibold">{description}</h1>
      {children}
      {showHorizontalRule && (
        <hr className="mt-5 mb-3 border-slate-300 w-full" />
      )}
    </>
  );
};

export default SettingsSubsection;
