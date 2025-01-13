import GenericForm from "../../../common/form/GenericForm";
import GenericFormButton from "../../../common/form/GenericFormButton";
import GenericInputField from "../../../common/form/GenericInputField";

const MfaSetup = () => {
  // const {data: response} = useMfaSetup();
  const onSubmit = (inputMap: Map<string, string>) => {
    // TODO
    console.log(inputMap);
  };

  return (
    <>
      <GenericForm
        title="Setup MFA"
        wrapperClassName="lg:h-screen"
        cardClassName="lg:w-2/6"
        beforeFormChildren={<p>Use an authenticator app TODO</p>}
        formChildren={
          <>
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

export default MfaSetup;
