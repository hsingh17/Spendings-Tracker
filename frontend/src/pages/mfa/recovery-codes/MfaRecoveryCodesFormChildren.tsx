import { FC } from "react";
import MfaRecoveryCodesAcknowledgement from "./MfaRecoveryCodesAcknowledgement";
import MfaRecoveryCodesCopy from "./MfaRecoveryCodesCopy";
import MfaRecoveryCodesTable from "./MfaRecoveryCodesTable";

type MfaRecoveryCodesFormChildrenProps = {
  recoveryCodes: string[];
};

const MfaRecoveryCodesFormChildren: FC<MfaRecoveryCodesFormChildrenProps> = ({
  recoveryCodes,
}) => {
  return (
    <>
      <MfaRecoveryCodesTable recoveryCodes={recoveryCodes} />
      <MfaRecoveryCodesCopy recoveryCodes={recoveryCodes} />
      <MfaRecoveryCodesAcknowledgement />
    </>
  );
};

export default MfaRecoveryCodesFormChildren;
