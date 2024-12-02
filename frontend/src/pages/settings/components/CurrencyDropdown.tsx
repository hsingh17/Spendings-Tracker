import React, { FC, useRef, useState } from "react";
import { CurrenciesListResponse, Currency } from "../../../hooks/useCurrencies";
import useDetectClickOutsideComponent from "../../../hooks/useDetectOutsideComponent";
import { ApiResponse, Nullable } from "../../../utils/types";
import SelectedCurrency from "./CurrencyDropdownClosed";
import CurrencyDropdownOpen from "./CurrencyDropdownOpen";

type CurrencyDropdownProps = {
  response?: ApiResponse<CurrenciesListResponse>;
};

const CurrencyDropdown: FC<CurrencyDropdownProps> = ({ response }) => {
  const selectedCurrencyRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const currencies = response?.data?.currencies;
  const getSelectedCurrency = (): Nullable<Currency> =>
    currencies?.find((currency) => currency.isSelected);

  const handleClickOutside = (e: Nullable<React.MouseEvent>, open: boolean) => {
    e?.preventDefault();
    if (isOpen !== open) {
      setIsOpen(open);
    }
  };

  useDetectClickOutsideComponent(
    [selectedCurrencyRef, dropdownRef],
    handleClickOutside
  );

  return (
    <div className="mt-5 relative">
      <div ref={selectedCurrencyRef}>
        <SelectedCurrency
          currency={getSelectedCurrency()}
          isOpen={isOpen}
          setOpen={setIsOpen}
        />
      </div>

      <div ref={dropdownRef}>
        <CurrencyDropdownOpen
          currencies={currencies}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
    </div>
  );
};

export default CurrencyDropdown;
