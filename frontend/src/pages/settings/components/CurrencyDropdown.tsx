import { FC, useState } from "react";
import { CurrenciesListResponse, Currency } from "../../../hooks/useCurrencies";
import { ApiResponse, Nullable } from "../../../utils/types";
import CurrencyDropdownClosed from "./CurrencyDropdownClosed";
import CurrencyDropdownOpen from "./CurrencyDropdownOpen";

type CurrencyDropdownProps = {
  response?: ApiResponse<CurrenciesListResponse>;
};

const CurrencyDropdown: FC<CurrencyDropdownProps> = ({ response }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const currencies = response?.data?.currencies;
  const getSelectedCurrency = (): Nullable<Currency> =>
    currencies?.find((currency) => currency.isSelected);

  return (
    <div className="mt-5 relative">
      <CurrencyDropdownClosed
        currency={getSelectedCurrency()}
        isOpen={isOpen}
        setOpen={setIsOpen}
      />

      <CurrencyDropdownOpen
        currencies={currencies}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
};

export default CurrencyDropdown;
