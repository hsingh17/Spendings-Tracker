import SettingsSection from "./SettingsSection";
import { SettingsSubsectionProps } from "./SettingsSubsection";

const PREFERENCES_SUBSECTIONS: SettingsSubsectionProps[] = [
  {
    subsectionTitle: "Currency",
    description:
      "Change your preferred currency type. This will change what currency is displayed when displaying your spendings",
    children: <> &#x1F1F3; </>,
  },
];

const PreferencesSection = () => {
  return (
    <SettingsSection
      className="mt-10"
      sectionTitle={"Preferences"}
      subsections={PREFERENCES_SUBSECTIONS}
    />
  );
};
export default PreferencesSection;
