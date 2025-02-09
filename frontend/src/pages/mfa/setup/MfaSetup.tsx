import ApiCallBoundary from "../../../common/ApiCallBoundary";
import useMfaSetup from "../../../hooks/useMfaSetup";
import Error from "../../error/Error";
import MfaSetupForm from "./MfaSetupForm";

const MfaSetup = () => {
  return (
    <ApiCallBoundary
      errorFallback={<Error />}
      loadingFallback={<></>}
      useApiCall={() => useMfaSetup()}
    >
      <>
        <MfaSetupForm />
      </>
    </ApiCallBoundary>
  );
};

export default MfaSetup;
