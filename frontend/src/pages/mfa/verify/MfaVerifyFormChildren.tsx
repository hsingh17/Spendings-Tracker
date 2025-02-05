import { Dispatch, FC, SetStateAction } from "react";
import GenericFormButton from "../../../common/form/GenericFormButton";
import { VerificationMethod } from "./MfaVerify";
import MfaVerifyRecoveryCode from "./MfaVerifyRecoveryCode";
import MfaVerifyTotp from "./MfaVerifyTotp";

type VerifyFormChildrenProps = {
  verificationMethod: VerificationMethod;
  setVerificationMethod: Dispatch<SetStateAction<VerificationMethod>>;
};

const MfaVerifyFormChildren: FC<VerifyFormChildrenProps> = ({
  verificationMethod,
  setVerificationMethod,
}) => {
  console.log(setVerificationMethod);

  return (
    <div className="mt-5">
      {verificationMethod === VerificationMethod.TOTP ? (
        <MfaVerifyTotp />
      ) : (
        <MfaVerifyRecoveryCode />
      )}

      <GenericFormButton value="Continue" />
    </div>
  );
};

export default MfaVerifyFormChildren;
