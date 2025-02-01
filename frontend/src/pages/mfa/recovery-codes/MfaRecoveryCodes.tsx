import ApiCallBoundary from "../../../common/ApiCallBoundary";
import useRecoveryCodes from "../../../hooks/useRecoveryCodes";
import Error from "../../error/Error";
import MfaRecoveryCodesForm from "./MfaRecoveryCodesForm";

const MfaRecoveryCodes = () => {
  return (
    <>
      <ApiCallBoundary
        errorFallback={<Error />}
        loadingFallback={<></>}
        useApiCall={() => useRecoveryCodes()}
      >
        <>
          <MfaRecoveryCodesForm />
        </>
      </ApiCallBoundary>
    </>
  );
};

export default MfaRecoveryCodes;
