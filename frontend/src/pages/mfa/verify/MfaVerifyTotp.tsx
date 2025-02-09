import MfaIcon from "../../../assets/components/MfaIcon";
import MfaVerifyTotpInput from "./MfaVerifyTotpInput";

const MfaVerifyTotp = () => {
  return (
    <div className="flex flex-col items-center">
      <MfaIcon className="mt-2 mb-5 h-24 w-24" />
      <MfaVerifyTotpInput />
    </div>
  );
};

export default MfaVerifyTotp;
