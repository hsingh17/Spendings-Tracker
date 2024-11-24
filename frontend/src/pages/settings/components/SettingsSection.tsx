import { FC } from "react";
import Card from "../../../common/Card";
import SettingsSubsection, {
  SettingsSubsectionProps,
} from "./SettingsSubsection";

type SettingsSectionProps = {
  sectionTitle: string;
  className?: string;
  subsections: SettingsSubsectionProps[];
};

const DEFAULT_CLASS_NAME = "mt-2";

const SettingsSection: FC<SettingsSectionProps> = ({
  sectionTitle,
  className,
  subsections,
}) => {
  if (!subsections || !subsections.length) {
    return <></>;
  }

  return (
    <div className={className || DEFAULT_CLASS_NAME}>
      <h1 className="font-bold text-theme-brand text-2xl">{sectionTitle}</h1>
      <Card className="mt-3 p-5 rounded-sm shadow-2xl w-full md:w-3/4">
        {subsections.map((subsection, idx) => {
          return (
            <SettingsSubsection
              key={idx}
              subsectionTitle={subsection.subsectionTitle}
              description={subsection.description}
              showHorizontalRule={subsection.showHorizontalRule}
            >
              {subsection.children}
            </SettingsSubsection>
          );
        })}
      </Card>
    </div>
  );
};

export default SettingsSection;
