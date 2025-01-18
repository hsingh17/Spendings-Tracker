import { FC } from "react";
import GenericForm from "../../../common/form/GenericForm";
import GenericFormButton from "../../../common/form/GenericFormButton";
import GenericInputField from "../../../common/form/GenericInputField";
import { SetupMfaResponse } from "../../../hooks/useMfaSetup";
import { ApiResponse } from "../../../utils/types";
import MfaSetupInstructions from "./MfaSetupInstructions";

type MfaSetupFormProps = {
  response?: ApiResponse<SetupMfaResponse>;
};

const MfaSetupForm: FC<MfaSetupFormProps> = ({ response }) => {
  const mfaResponse = response?.data;
  const onSubmit = (inputMap: Map<string, string>) => {
    // TODO
    console.log(inputMap);
  };

  const copySecretStringToClipboard = () =>
    navigator.clipboard.writeText(mfaResponse?.secretString || "");

  if (!mfaResponse) {
    return <></>;
  }

  return (
    <>
      <GenericForm
        title="Setup MFA"
        wrapperClassName="lg:h-screen"
        cardClassName="lg:w-2/6"
        beforeFormChildren={<MfaSetupInstructions />}
        formChildren={
          <>
            <img className="ml-auto mr-auto" src={mfaResponse.qrCodeDataUri} />
            <span
              onClick={copySecretStringToClipboard}
              className="cursor-pointer"
            >
              <p className="text-center w-full mb-5 font-semibold text-slate-400 text-lg">
                {mfaResponse.secretString}
                TODO copy icon
              </p>
            </span>

            <label className="font-semibold text-slate-500">TOTP Code</label>
            <GenericInputField type="text" name="totp-code" />

            <GenericFormButton value="Set up" />
          </>
        }
        onSubmit={onSubmit}
      />
    </>
  );
};

export default MfaSetupForm;
