import GenericForm from "../../../common/form/GenericForm";
import GenericFormButton from "../../../common/form/GenericFormButton";
import PasswordInput from "../../../common/form/PasswordInput";

const ChangePassword = () => {
  return (
    <GenericForm
      title={""}
      wrapperClassName="mt-3"
      cardClassName="items-center w-full h-fit p-0 shadow-none"
      overrideClassName={true}
      formChildren={
        <>
          <PasswordInput title={"Old Password"} showConfirmPassword={false} />
          <PasswordInput
            customStyles="mt-2"
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
      onSubmit={function (inputMap: Map<string, string>): void {
        console.log(inputMap);
      }}
    />
  );
};

export default ChangePassword;
