import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";
import SettingsSection from "./SettingsSection";
import { SettingsSubsectionProps } from "./SettingsSubsection";

const ACCOUNT_SUBSECTIONS: SettingsSubsectionProps[] = [
  {
    subsectionTitle: "Change Password",
    description:
      "Change your password. You must enter your old password before you can change your password.",
    children: <ChangePassword />,
  },
  {
    subsectionTitle: "Delete Account",
    description:
      "Permanently delete your account. This action is irreversible.",
    showHorizontalRule: false,
    children: <DeleteAccount />,
  },
];

const AccountSection = () => {
  return (
    <SettingsSection
      sectionTitle={"Account"}
      subsections={ACCOUNT_SUBSECTIONS}
    />
  );
};
export default AccountSection;
