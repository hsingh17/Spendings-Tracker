import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import GenericForm from "../../common/form/GenericForm";
import GenericFormButton from "../../common/form/GenericFormButton";
import PasswordInput from "../../common/form/PasswordInput";
import useResetPassword from "../../hooks/useResetPassword";
import { LOGIN_PAGE } from "../../utils/constants";
import PasswordResetHeader from "./component/PasswordResetHeader";

const PasswordReset = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const username = searchParams.get("username");
  const uuid = searchParams.get("uuid");

  const { mutate: resetPassword } = useResetPassword(username!, () =>
    navigate(LOGIN_PAGE),
  );

  const onSubmit = (inputMap: Map<string, string>) => {
    const newPassword = inputMap.get("new-password");
    // Validation ensures we won't get here unless password is valid
    resetPassword({
      password: newPassword!,
      uuid: uuid!,
    });
  };

  useEffect(() => {
    // Can't attempt a password reset without these
    if (!username || !uuid) {
      navigate(LOGIN_PAGE);
      return;
    }
  }, []);

  return (
    <GenericForm
      title="Reset Password"
      onSubmit={onSubmit}
      beforeFormChildren={<PasswordResetHeader />}
      formChildren={
        <>
          <PasswordInput
            name="new-password"
            title="New Password"
            showPasswordReq={true}
            showConfirmPassword={true}
          />
          <GenericFormButton value="Reset Password" />
        </>
      }
    />
  );
};

export default PasswordReset;
