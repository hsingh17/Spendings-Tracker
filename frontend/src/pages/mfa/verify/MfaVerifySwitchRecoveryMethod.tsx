import { Dispatch, FC, SetStateAction } from "react";
import { VerificationMethod } from "./MfaVerify";

type MfaVerifySwitchRecoveryMethodProps = {
  verificationMethod: VerificationMethod;
  setVerificationMethod: Dispatch<SetStateAction<VerificationMethod>>;
};

const MfaVerifySwitchRecoveryMethod: FC<MfaVerifySwitchRecoveryMethodProps> = ({
  verificationMethod,
  setVerificationMethod,
}) => {
  const onClick = () => {
    if (verificationMethod === VerificationMethod.TOTP) {
      setVerificationMethod(VerificationMethod.RECOVERY_CODE);
    } else {
      setVerificationMethod(VerificationMethod.TOTP);
    }
  };

  return (
    <p
      className="mt-5 text-theme-cta font-semibold hover:brightness-75 hover:cursor-pointer"
      onClick={onClick}
    >
      {verificationMethod === VerificationMethod.TOTP
        ? "Use a recovery code"
        : "Use an MFA code"}
    </p>
  );
};

export default MfaVerifySwitchRecoveryMethod;
