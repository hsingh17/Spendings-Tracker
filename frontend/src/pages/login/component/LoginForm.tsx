import { FC, useState } from "react";
import toast from "react-hot-toast";
import GenericForm from "../../../common/form/GenericForm";
import GenericFormButton from "../../../common/form/GenericFormButton";
import PasswordInput from "../../../common/form/PasswordInput";
import UsernameInput from "../../../common/form/UsernameInput";
import useLogin from "../../../hooks/useLogin";
import CreateAccountRedirect from "./CreateAccountRedirect";
import ExternalAuthProviders from "./ExternalAuthProviders";

const LoginForm: FC = () => {
  const [loginDisabled, setLoginDisabled] = useState<boolean>(false);

  const { mutate: login } = useLogin(() => {
    toast.error("Invalid login credentials!", {
      position: "bottom-center",
    });

    setLoginDisabled(false);
  });

  const onSubmit = (inputMap: Map<string, string>) => {
    const username = inputMap.get("username");
    const password = inputMap.get("password");
    if (username && password) {
      login({
        username: username,
        password: password,
      });

      setLoginDisabled(true);
    }
  };

  return (
    <>
      <GenericForm
        title="Log in"
        wrapperClassName="lg:h-screen"
        cardClassName="lg:w-2/6"
        onSubmit={onSubmit}
        formChildren={
          <>
            <UsernameInput withIcon={true} />
            <div className="mt-5">
              <PasswordInput withIcon={true} showForgotPassword={true} />
              <GenericFormButton
                value={loginDisabled ? "Logging in" : "Log in"}
              />
              <ExternalAuthProviders />
            </div>
          </>
        }
        afterFormChildren={<CreateAccountRedirect />}
      />
    </>
  );
};

export default LoginForm;
