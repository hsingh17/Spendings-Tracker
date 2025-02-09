import GenericInputField from "../../../common/form/GenericInputField";

const MfaVerifyRecoveryCode = () => {
  return (
    <div className="w-full">
      <GenericInputField type={"text"} name={"recovery-code"} />
    </div>
  );
};

export default MfaVerifyRecoveryCode;
