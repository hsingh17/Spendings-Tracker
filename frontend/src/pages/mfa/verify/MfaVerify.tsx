import { useState } from "react";
import GenericForm from "../../../common/form/GenericForm";
import MfaVerifyFormChildren from "./MfaVerifyFormChildren";
import MfaVerifyInstructions from "./MfaVerifyInstructions";

export enum VerificationMethod {
  TOTP,
  RECOVERY_CODE,
}

const MfaVerify = () => {
  const [verificationMethod, setVerificationMethod] =
    useState<VerificationMethod>(VerificationMethod.TOTP);

  console.log(verificationMethod, setVerificationMethod);

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
        onSubmit={function (inputMap: Map<string, string>): void {
          console.log(inputMap);
          throw new Error("Function not implemented.");
        }}
      />
    </>
  );
};

export default MfaVerify;
