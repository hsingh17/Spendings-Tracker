import GenericForm from "../../../common/form/GenericForm";
import GenericFormButton from "../../../common/form/GenericFormButton";
import PasswordInput from "../../../common/form/PasswordInput";
import useChangePassword from "../../../hooks/useChangePassword";

const ChangePassword = () => {
  const { mutate: changePassword } = useChangePassword();
  const onSubmit = (inputMap: Map<string, string>) => {
    changePassword({
      oldPassword: inputMap.get("old-password")!,
      newPassword: inputMap.get("new-password")!,
    });
  };

  return (
    <GenericForm
      title={""}
      wrapperClassName="mt-3"
      cardClassName="items-center w-full h-fit p-0 shadow-none"
      overrideClassName={true}
      formChildren={
        <>
          <PasswordInput
            title={"Current Password"}
            showConfirmPassword={false}
            name="old-password"
          />

          {/* TODO: Something weird going on with confirm password of new password. For some reason, you need to re-enter it to hit API, so must be validation bugging out */}
          <PasswordInput
            customStyles="mt-2"
            name="new-password"
            title={"New Password"}
            showPasswordReq={true}
            showConfirmPassword={true}
          />

          <GenericFormButton
            className="mt-5 w-fit bg-theme-cta rounded-lg text-white font-bold px-3 py-2 hover:brightness-75 hover:cursor-pointer"
            value={"Change password"}
          />
        </>
      }
      onSubmit={onSubmit}
    />
  );
};

export default ChangePassword;
