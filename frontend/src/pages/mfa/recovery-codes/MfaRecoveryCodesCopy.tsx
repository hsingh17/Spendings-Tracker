import { FC } from "react";
import toast from "react-hot-toast";
import CopyIcon from "../../../assets/components/CopyIcon";

type MfaRecoveryCodesCopy = {
  recoveryCodes: string[];
};

const MfaRecoveryCodesCopy: FC<MfaRecoveryCodesCopy> = ({ recoveryCodes }) => {
  const copyCodesToClipboard = () => {
    navigator.clipboard.writeText(recoveryCodes.join("\n"));
    toast.success("Copied to clipboard", { position: "bottom-center" });
  };

  return (
    <div
      className="mt-2 w-full flex flex-row justify-center hover:cursor-pointer"
      onClick={copyCodesToClipboard}
    >
      <p className="font-semibold text-slate-400 text-lg">Copy Codes</p>
      <CopyIcon className="ml-1 w-7 h-7 stroke-slate-400" />
    </div>
  );
};

export default MfaRecoveryCodesCopy;
