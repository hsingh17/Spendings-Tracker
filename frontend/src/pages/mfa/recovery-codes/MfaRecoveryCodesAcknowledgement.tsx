import { useState } from "react";
import GenericFormButton from "../../../common/form/GenericFormButton";

const MfaRecoveryCodesAcknowledgement = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-row items-center justify-center mt-5">
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

export default MfaRecoveryCodesAcknowledgement;
