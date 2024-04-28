import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CodeInput from "../../common/form/CodeInput";
import GenericForm from "../../common/form/GenericForm";
import GenericFormButton from "../../common/form/GenericFormButton";
import useVerifyAccount from "../../hooks/useVerifyAccount";
import { LOGIN_PAGE } from "../../utils/constants";
import ResendRegistrationEmail from "./component/ResendRegistrationEmail";
import VerifyAccountHeader from "./component/VerifyAccountHeader";

const VerifyAccount = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const username = searchParams.get("username");

  const { mutate: verifyAccount } = useVerifyAccount(username!);

  const onSubmit = (inputMap: Map<string, string>) => {
    const code = inputMap.get("code");
    if (code) {
      verifyAccount({
        pin: code,
      });
    }
  };

  useEffect(() => {
    // Can't complete account verification process without a username
    if (!username || username.length === 0) {
      navigate(LOGIN_PAGE);
      return;
    }
  }, []);

  return (
    <GenericForm
      onSubmit={onSubmit}
      title="Complete registration"
      beforeFormChildren={<VerifyAccountHeader />}
      formChildren={
        <>
          <CodeInput />
          <GenericFormButton value="Complete registration" />
        </>
      }
      afterFormChildren={<ResendRegistrationEmail username={username!} />}
    />
  );
};

export default VerifyAccount;
