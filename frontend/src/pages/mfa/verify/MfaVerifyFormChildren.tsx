import { Dispatch, FC, SetStateAction } from "react";
import GenericFormButton from "../../../common/form/GenericFormButton";
import { VerificationMethod } from "./MfaVerify";
import MfaVerifyRecoveryCode from "./MfaVerifyRecoveryCode";
import MfaVerifySwitchRecoveryMethod from "./MfaVerifySwitchRecoveryMethod";
import MfaVerifyTotp from "./MfaVerifyTotp";

type MfaVerifyFormChildrenProps = {
  verificationMethod: VerificationMethod;
  setVerificationMethod: Dispatch<SetStateAction<VerificationMethod>>;
};

const MfaVerifyFormChildren: FC<MfaVerifyFormChildrenProps> = ({
  verificationMethod,
  setVerificationMethod,
}) => {
  return (
    <div className="mt-5 flex flex-col items-center">
      {verificationMethod === VerificationMethod.TOTP ? (
        <MfaVerifyTotp />
      ) : (
        <MfaVerifyRecoveryCode />
      )}

      <GenericFormButton value="Continue" />
      <MfaVerifySwitchRecoveryMethod
        verificationMethod={verificationMethod}
        setVerificationMethod={setVerificationMethod}
      />
    </div>
  );
};

export default MfaVerifyFormChildren;
