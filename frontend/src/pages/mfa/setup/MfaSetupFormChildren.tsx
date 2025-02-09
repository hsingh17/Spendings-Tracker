import { FC } from "react";
import GenericFormButton from "../../../common/form/GenericFormButton";
import GenericInputField from "../../../common/form/GenericInputField";
import { SetupMfaResponse } from "../../../hooks/useMfaSetup";
import MfaSetupQrCode from "./MfaSetupQrCode";
type MfaSetupFormChildrenProps = {
  mfaResponse: SetupMfaResponse;
};

const MfaSetupFormChildren: FC<MfaSetupFormChildrenProps> = ({
  mfaResponse,
}) => {
  return (
    <>
      <MfaSetupQrCode mfaResponse={mfaResponse} />
      <label className="font-semibold text-slate-500">TOTP Code</label>
      <GenericInputField type="text" name="totp-code" />
      <GenericFormButton value="Set up" />
    </>
  );
};

export default MfaSetupFormChildren;
