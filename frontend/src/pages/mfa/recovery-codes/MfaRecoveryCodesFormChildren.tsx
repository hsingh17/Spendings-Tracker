import { FC, useState } from "react";
import CopyIcon from "../../../assets/components/CopyIcon";
import GenericFormButton from "../../../common/form/GenericFormButton";

type MfaRecoveryCodesFormChildrenProps = {
  recoveryCodes: string[];
};

const MfaRecoveryCodesFormChildren: FC<MfaRecoveryCodesFormChildrenProps> = ({
  recoveryCodes,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <>
      <div>{recoveryCodes}</div>
      <div className="flex flex-row">
        <p>Copy Codes</p>
        <CopyIcon className="ml-1 w-7 h-7 stroke-slate-400" />
      </div>
      <div className="flex flex-row items-center justify-center">
        <input
          type="checkbox"
          name="checkbox"
          className="md:mt-[3px] scale-125"
          onClick={() => setIsChecked(!isChecked)}
        />

        <p className="font-bold ml-2 text-lg md:text-xl text-theme-cta text-center md:text-left">
          I acknowledge that I have saved my recovery codes
        </p>
      </div>
      <GenericFormButton value={"Continue"} disabled={!isChecked} />
    </>
  );
};

export default MfaRecoveryCodesFormChildren;
