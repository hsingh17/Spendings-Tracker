import GenericInputField from "../../../common/form/GenericInputField";
import { RECOVERY_CODE_KEY } from "./MfaVerify";

const MfaVerifyRecoveryCode = () => {
  return (
    <div className="w-full">
      <GenericInputField type="text" name={RECOVERY_CODE_KEY} />
    </div>
  );
};

export default MfaVerifyRecoveryCode;
