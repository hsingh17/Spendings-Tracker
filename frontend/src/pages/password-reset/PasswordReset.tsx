import React from "react";
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

  // Can't attempt a password reset without these
  if (!username || !uuid) {
    navigate(LOGIN_PAGE);
    return;
  }

  const { mutate } = useResetPassword(username, () => navigate(LOGIN_PAGE));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      "new-password": { value: string };
      "confirm-password": { value: string };
    };

    const newPassword = target["new-password"].value;
    const confirmPassword = target["confirm-password"].value;

    if (newPassword !== confirmPassword) {
      // TODO: Error
      alert("Passwords must match!");
      return;
    }

    mutate({
      password: newPassword,
      uuid: uuid,
    });
  };

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
            showForgotPassword={false}
          />
          <PasswordInput
            name="confirm-password"
            title="Confirm Password"
            customStyles="mt-3 mb-2"
            showForgotPassword={false}
          />
          <GenericFormButton value="Reset Password" />
        </>
      }
    />
  );
};

export default PasswordReset;
