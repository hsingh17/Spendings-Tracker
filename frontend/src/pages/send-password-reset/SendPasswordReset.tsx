import BackToLoginPage from "../../common/form/BackToLoginPage";
import GenericForm from "../../common/form/GenericForm";
import GenericFormButton from "../../common/form/GenericFormButton";
import UsernameInput from "../../common/form/UsernameInput";
import useSendPasswordResetEmail from "../../hooks/useSendPasswordResetEmail";
import ResetPasswordHeader from "./component/ResetPasswordHeader";

const SendPasswordReset = () => {
  const { mutate: sendPasswordResetEmail } = useSendPasswordResetEmail();

  const onSubmit = (inputMap: Map<string, string>) => {
    const username = inputMap.get("username");
    if (!username || username.length == 0) {
      // TODO: Error
      alert("Username can't be empty");
      return;
    }

    sendPasswordResetEmail(username);
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
