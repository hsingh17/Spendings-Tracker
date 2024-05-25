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
    const confirmPassword = inputMap.get("confirm-password");
    if (newPassword !== confirmPassword) {
      alert("Passwords must match!");
      return;
    }

    // Using '!' because isFormValid can only be true if all conditions are met
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
      formChildren={
        <>
          <EmailInput />
          <UsernameInput />
          <PasswordInput showPasswordReq={true} customStyles="mt-3 mb-2" />
          <PasswordInput
            name="confirm-password"
            title="Confirm Password"
            customStyles="mt-3 mb-2"
          />
          <GenericFormButton value="Create Account" />
        </>
      }
      afterFormChildren={<BackToLoginPage />}
    />
  );
};

export default CreateAccount;
