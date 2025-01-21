import { FC } from "react";
import toast from "react-hot-toast";
import CopyIcon from "../../../assets/components/CopyIcon";
import { SetupMfaResponse } from "../../../hooks/useMfaSetup";

type MfaSetupQrCodeProps = {
  mfaResponse: SetupMfaResponse;
};

const MfaSetupQrCode: FC<MfaSetupQrCodeProps> = ({ mfaResponse }) => {
  const copySecretStringToClipboard = () => {
    navigator.clipboard.writeText(mfaResponse?.secretString || "");
    toast.success("Copied to clipboard", { position: "bottom-center" });
  };

  return (
    <>
      <img className="ml-auto mr-auto" src={mfaResponse.qrCodeDataUri} />
      <div
        onClick={copySecretStringToClipboard}
        className="w-full flex flex-row justify-center hover:cursor-pointer"
      >
        <p className="w-fit mb-5 font-semibold text-slate-400 text-lg">
          {mfaResponse.secretString}
        </p>
        <CopyIcon className="ml-1 w-7 h-7 stroke-slate-400" />
      </div>
    </>
  );
};

export default MfaSetupQrCode;
