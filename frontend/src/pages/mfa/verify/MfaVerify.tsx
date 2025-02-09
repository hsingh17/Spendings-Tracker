import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GenericForm from "../../../common/form/GenericForm";
import useVerifyMfa from "../../../hooks/useVerifyMfa";
import { DASHBOARD_PAGE } from "../../../utils/constants";
import MfaVerifyFormChildren from "./MfaVerifyFormChildren";
import MfaVerifyInstructions from "./MfaVerifyInstructions";

export const RECOVERY_CODE_KEY = "recovery-code";
export const TOTP_KEY = "totp-code";

export enum VerificationMethod {
  TOTP,
  RECOVERY_CODE,
}

const MfaVerify = () => {
  const [verificationMethod, setVerificationMethod] =
    useState<VerificationMethod>(VerificationMethod.TOTP);
  const navigate = useNavigate();
  const { mutate: verifyMfa } = useVerifyMfa(() => navigate(DASHBOARD_PAGE));

  const onSubmit = (inputMap: Map<string, string>) => {
    if (inputMap.has(RECOVERY_CODE_KEY) || inputMap.has(TOTP_KEY)) {
      verifyMfa({
        recoveryCode: inputMap.get(RECOVERY_CODE_KEY),
        totpCode: inputMap.get(TOTP_KEY),
      });
    }
  };

  return (
    <>
      <GenericForm
        title="Enter MFA Code"
        wrapperClassName="lg:h-screen"
        cardClassName="lg:w-2/5 w-fit"
        beforeFormChildren={
          <MfaVerifyInstructions verificationMethod={verificationMethod} />
        }
        formChildren={
          <>
            <MfaVerifyFormChildren
              verificationMethod={verificationMethod}
              setVerificationMethod={setVerificationMethod}
            />
          </>
        }
        onSubmit={onSubmit}
      />
    </>
  );
};

export default MfaVerify;
