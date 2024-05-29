import { FC } from "react";
import toast from "react-hot-toast";
import GenericForm from "../../../common/form/GenericForm";
import GenericFormButton from "../../../common/form/GenericFormButton";
import PasswordInput from "../../../common/form/PasswordInput";
import UsernameInput from "../../../common/form/UsernameInput";
import useLogin from "../../../hooks/useLogin";
import CreateAccountRedirect from "./CreateAccountRedirect";
import GoogleSignInButton from "./GoogleSignInButton";

const LoginForm: FC = () => {
  const { mutate: login } = useLogin(() => {
    toast.error("Invalid login credentials!", {
      position: "bottom-center",
    });
  });

  const onSubmit = (inputMap: Map<string, string>) => {
    const username = inputMap.get("username");
    const password = inputMap.get("password");
    if (username && password) {
      login({
        username: username,
        password: password,
      });
    }
  };

  return (
    <>
      <GenericForm
        title="Log in"
        onSubmit={onSubmit}
        formChildren={
          <>
            <UsernameInput />
            <div className="mt-5">
              <PasswordInput showForgotPassword={true} />
              <GenericFormButton value="Log in" />
              <GoogleSignInButton />
            </div>
          </>
        }
        afterFormChildren={<CreateAccountRedirect />}
      />
    </>
  );
};

export default LoginForm;
