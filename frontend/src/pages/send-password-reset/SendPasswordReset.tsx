import React from "react";
import GenericForm from "../../common/form/GenericForm";
import GenericFormButton from "../../common/form/GenericFormButton";
import UsernameInput from "../../common/form/UsernameInput";
import useSendPasswordResetEmail from "../../hooks/useSendPasswordResetEmail";
import BackToLoginPage from "./component/BackToLoginPage";
import ResetPasswordHeader from "./component/ResetPasswordHeader";

const SendPasswordReset = () => {
  const { mutate } = useSendPasswordResetEmail();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      username: { value: string };
    };

    const username: string = target.username.value;
    if (!username || username.length == 0) {
      // TODO: Error
      alert("Username can't be empty");
      return;
    }

    mutate(target.username.value);
  };

  return (
    <GenericForm
      title="Send Password Reset Instructions"
      onSubmit={onSubmit}
      beforeFormChildren={<ResetPasswordHeader />}
      formChildren={
        <>
          <UsernameInput />
          <GenericFormButton value="Send instructions" />
        </>
      }
      afterFormChildren={<BackToLoginPage />}
    />
  );
};

export default SendPasswordReset;
