import ApiCallBoundary from "../../../common/ApiCallBoundary";
import useCurrencies from "../../../hooks/useCurrencies";
import CurrencyDropdown from "./CurrencyDropdown";

const CurrencySection = () => {
  return (
    <ApiCallBoundary
      errorFallback={<>Unable to load currencies. Please try again later</>}
      loadingFallback={<></>}
      useApiCall={() => useCurrencies()}
    >
      <>
        <CurrencyDropdown />
      </>
    </ApiCallBoundary>
  );
};

export default CurrencySection;
