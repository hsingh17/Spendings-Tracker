import GenericFormButton from "../../../common/form/GenericFormButton";
import PasswordInput from "../../../common/form/PasswordInput";
import DeleteAccount from "./DeleteAccount";
import SettingsSection from "./SettingsSection";
import { SettingsSubsectionProps } from "./SettingsSubsection";

const ACCOUNT_SUBSECTIONS: SettingsSubsectionProps[] = [
  {
    subsectionTitle: "Change Password",
    description:
      "Change your password. You must enter your old password before you can change your password.",
    children: (
      <div className="mt-2">
        <PasswordInput title={"Old Password"} showConfirmPassword={false} />
        <PasswordInput
          customStyles="mt-2"
          title={"New Password"}
          showConfirmPassword={true}
        />
        <GenericFormButton value={"Change password"} />
      </div>
    ),
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
  console.log(ACCOUNT_SUBSECTIONS);

  return (
    <SettingsSection sectionTitle={""} subsections={ACCOUNT_SUBSECTIONS} />
  );
};
export default AccountSection;
