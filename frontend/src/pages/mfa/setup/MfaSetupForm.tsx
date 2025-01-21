import { FC } from "react";
import { useNavigate } from "react-router-dom";
import GenericForm from "../../../common/form/GenericForm";
import { SetupMfaResponse } from "../../../hooks/useMfaSetup";
import useVerifyMfa from "../../../hooks/useVerifyMfa";
import { DASHBOARD_PAGE } from "../../../utils/constants";
import { ApiResponse } from "../../../utils/types";
import MfaSetupFormChildren from "./MfaSetupFormChildren";
import MfaSetupInstructions from "./MfaSetupInstructions";

type MfaSetupFormProps = {
  response?: ApiResponse<SetupMfaResponse>;
};

const MfaSetupForm: FC<MfaSetupFormProps> = ({ response }) => {
  const navigate = useNavigate();
  const { mutate: verifyMfa } = useVerifyMfa(() => navigate(DASHBOARD_PAGE));
  const mfaResponse = response?.data;
  const onSubmit = (inputMap: Map<string, string>) =>
    verifyMfa({ totpCode: inputMap.get("totp-code") });

  if (!mfaResponse) {
    return <></>;
  }

  // Verify mfa no work since server run on utc and sending code from pst

  return (
    <>
      <GenericForm
        title="Setup MFA"
        wrapperClassName="lg:h-screen"
        cardClassName="lg:w-2/6"
        beforeFormChildren={<MfaSetupInstructions />}
        formChildren={
          <>
            <MfaSetupFormChildren mfaResponse={mfaResponse} />
          </>
        }
        onSubmit={onSubmit}
      />
    </>
  );
};

export default MfaSetupForm;
