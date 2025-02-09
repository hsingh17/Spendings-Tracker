import { FC } from "react";
import { useNavigate } from "react-router-dom";
import GenericForm from "../../../common/form/GenericForm";
import { RecoveryCodes } from "../../../hooks/useRecoveryCodes";
import { DASHBOARD_PAGE } from "../../../utils/constants";
import { ApiResponse } from "../../../utils/types";
import MfaRecoveryCodeInstructions from "./MfaRecoveryCodeInstructions";
import MfaRecoveryCodesFormChildren from "./MfaRecoveryCodesFormChildren";

type MfaRecoveryCodesFormProps = {
  response?: ApiResponse<RecoveryCodes>;
};

const MfaRecoveryCodesForm: FC<MfaRecoveryCodesFormProps> = ({ response }) => {
  const navigate = useNavigate();
  if (!response || !response.data) {
    return <></>;
  }

  // Hacky but whatever
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = (_inputMap: Map<string, string>) => navigate(DASHBOARD_PAGE);

  return (
    <>
      <GenericForm
        title={"Recovery Codes"}
        wrapperClassName="lg:h-screen"
        cardClassName="lg:w-2/6"
        beforeFormChildren={<MfaRecoveryCodeInstructions />}
        formChildren={
          <>
            <MfaRecoveryCodesFormChildren
              recoveryCodes={response.data.recoveryCodes}
            />
          </>
        }
        onSubmit={onSubmit}
      />
    </>
  );
};

export default MfaRecoveryCodesForm;
