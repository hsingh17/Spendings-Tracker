import { FC } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import GenericForm from "../../../common/form/GenericForm";
import GenericFormButton from "../../../common/form/GenericFormButton";
import PasswordInput from "../../../common/form/PasswordInput";
import UsernameInput from "../../../common/form/UsernameInput";
import QueryClientConfig from "../../../config/QueryClientConfig";
import useLogin from "../../../hooks/useLogin";
import { DASHBOARD_PAGE } from "../../../utils/constants";
import CreateAccountRedirect from "./CreateAccountRedirect";
import GoogleSignInButton from "./GoogleSignInButton";

const LoginForm: FC = () => {
  const navigate = useNavigate();

  const { mutate: login } = useLogin(
    () => {
      navigate(DASHBOARD_PAGE);
      // Invalidate the user key from cache so we get the new logged in user
      QueryClientConfig.removeQueries(["user"]);
    },
    () => {
      toast.error("Invalid login credentials!", {
        position: "bottom-center",
      });
    },
  );

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
              <PasswordInput />
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
