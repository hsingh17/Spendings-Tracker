import { FC } from "react";
import { VerificationMethod } from "./MfaVerify";

type MfaVerifyInstructionsProps = {
  verificationMethod: VerificationMethod;
};

const MfaVerifyInstructions: FC<MfaVerifyInstructionsProps> = ({
  verificationMethod,
}) => {
  return (
    <p className="text-slate-500 font-semibold mt-2 text-left w-full">
      {verificationMethod === VerificationMethod.TOTP
        ? "Using your authenticator app, enter the 6 digit code that is shown in the app before it expires."
        : "Enter a recovery code from when you first setup MFA."}
    </p>
  );
};

export default MfaVerifyInstructions;
