import React from "react";
import BackToLoginPage from "../../common/form/BackToLoginPage";
import EmailInput from "../../common/form/EmailInput";
import GenericForm from "../../common/form/GenericForm";
import GenericFormButton from "../../common/form/GenericFormButton";
import PasswordInput from "../../common/form/PasswordInput";
import UsernameInput from "../../common/form/UsernameInput";
import useCreateAccount from "../../hooks/useCreateAccount";

const CreateAccount = () => {
  const { mutate } = useCreateAccount();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      email: { value: string };
      username: { value: string };
      password: { value: string };
      "confirm-password": { value: string };
    };

    const newPassword = target["password"].value;
    const confirmPassword = target["confirm-password"].value;

    if (newPassword !== confirmPassword) {
      // TODO: Error
      alert("Passwords must match!");
      return;
    }

    mutate({
      email: target["email"].value,
      username: target["username"].value,
      password: newPassword,
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

          <PasswordInput customStyles="mt-3 mb-2" showForgotPassword={false} />
          <PasswordInput
            name="confirm-password"
            title="Confirm Password"
            customStyles="mt-3 mb-2"
            showForgotPassword={false}
          />

          <GenericFormButton value="Create Account" />

          <BackToLoginPage />
        </>
      }
    />
  );
};

export default CreateAccount;
