import BackToLoginPage from "../../common/form/BackToLoginPage";
import EmailInput from "../../common/form/EmailInput";
import GenericForm from "../../common/form/GenericForm";
import GenericFormButton from "../../common/form/GenericFormButton";
import PasswordInput from "../../common/form/PasswordInput";
import UsernameInput from "../../common/form/UsernameInput";
import useCreateAccount from "../../hooks/useCreateAccount";

const CreateAccount = () => {
  const { mutate: createAccount } = useCreateAccount();

  const onSubmit = (inputMap: Map<string, string>) => {
    const email = inputMap.get("email");
    const username = inputMap.get("username");
    const newPassword = inputMap.get("password");
    createAccount({
      email: email!,
      username: username!,
      password: newPassword!,
    });
  };

  return (
    <GenericForm
      onSubmit={onSubmit}
      title="Create an Account"
      wrapperClassName="lg:h-screen"
      cardClassName="lg:w-2/6"
      formChildren={
        <>
          <EmailInput />
          <UsernameInput />
          <PasswordInput
            customStyles="mt-3 mb-2"
            showPasswordReq={true}
            showConfirmPassword={true}
          />
          <GenericFormButton value="Create Account" />
        </>
      }
      afterFormChildren={<BackToLoginPage />}
    />
  );
};

export default CreateAccount;
