import { useState } from "react";
import BackToLoginPage from "../../common/form/BackToLoginPage";
import EmailInput from "../../common/form/EmailInput";
import GenericForm from "../../common/form/GenericForm";
import GenericFormButton from "../../common/form/GenericFormButton";
import PasswordInput from "../../common/form/PasswordInput";
import UsernameInput from "../../common/form/UsernameInput";
import useCreateAccount from "../../hooks/useCreateAccount";
import PasswordRequirements from "./component/PasswordRequirements";

const CreateAccount = () => {
  const [password, setPassword] = useState<string>("");
  const [isValidPassword, setIsValidPassword] = useState<boolean>(false);
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

    if (email && username && newPassword) {
      createAccount({
        email: email,
        username: username,
        password: newPassword,
      });
    }
  };

  console.log(isValidPassword); // TODO: Remove

  return (
    <GenericForm
      onSubmit={onSubmit}
      title="Create an Account"
      formChildren={
        <>
          <EmailInput />
          <UsernameInput />

          <PasswordInput
            setPassword={setPassword}
            customStyles="mt-3 mb-2"
            showForgotPassword={false}
          />

          <PasswordRequirements
            password={password}
            setIsValid={setIsValidPassword}
          />

          <PasswordInput
            name="confirm-password"
            title="Confirm Password"
            customStyles="mt-3 mb-2"
            showForgotPassword={false}
          />

          <GenericFormButton value="Create Account" />
        </>
      }
      afterFormChildren={<BackToLoginPage />}
    />
  );
};

export default CreateAccount;
