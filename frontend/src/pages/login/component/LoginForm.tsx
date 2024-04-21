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
import { UserFormData } from "../../../utils/types";
import CreateAccountRedirect from "./CreateAccountRedirect";

const LoginForm: FC = () => {
  const navigate = useNavigate();

  const { mutate: login } = useLogin(
    () => {
      navigate(DASHBOARD_PAGE);
      QueryClientConfig.removeQueries(["user"]); // Invalidate the user key from cache so we get the new logged in user
    },
    () => {
      toast.error("Invalid login credentials!", {
        position: "bottom-center",
      });
    },
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };

    const formData: UserFormData = {
      username: target.username.value,
      password: target.password.value,
    };

    login(formData);
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
            </div>
          </>
        }
        afterFormChildren={<CreateAccountRedirect />}
      />
    </>
  );
};

export default LoginForm;
