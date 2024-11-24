import { FC, ReactNode, useState } from "react";
import DownChevron from "../../../assets/components/DownChevron";
import { CurrenciesListResponse, Currency } from "../../../hooks/useCurrencies";
import { ApiResponse, Nullable } from "../../../utils/types";
import CurrencyDropdownOption from "./CurrencyDropdownOption";

type CurrencyDropdownProps = {
  response?: ApiResponse<CurrenciesListResponse>;
};

const CurrencyDropdown: FC<CurrencyDropdownProps> = ({ response }) => {
  const [isOpen, setIsOpen] = useState<boolean>();
  const currencies = response?.data?.currencies;
  const currencyOptionComponents = currencies?.map((currency, idx) => (
    <CurrencyDropdownOption
      key={currency.shortName}
      currency={currency}
      showHorizontalRule={idx !== currencies.length - 1}
      isSelected={currency.shortName === "USD"} // TODO: Come from API
    />
  ));
  const getSelectedCurrency = (): Nullable<Currency> => {
    return currencies?.find((currency) => currency.shortName === "USD");
  };

  // TODO: Default selection to user's currently selected currency (need boolean flag from api response)

  const handleOnClick = () => {
    setIsOpen(true);
  };

  const renderComponent = (): ReactNode => {
    if (isOpen) {
      return (
        <div className="flex flex-col overflow-y-scroll h-48">
          {currencyOptionComponents}
        </div>
      );
    }

    const selectedCurrency = getSelectedCurrency();
    if (!selectedCurrency) {
      return <>TODO</>;
    }

    // Move to separate component?
    return (
      <div
        className="flex flex-row border-2 border-gray-300 rounded-lg py-3 pl-3 pr-3 w-full md:w-fit items-center hover:cursor-pointer hover:border-gray-500"
        onClick={handleOnClick}
      >
        <CurrencyDropdownOption
          key={selectedCurrency.shortName}
          currency={selectedCurrency}
          showHorizontalRule={false}
          isSelected={false}
          animateHover={false}
        />

        <DownChevron className="ml-16 w-5 h-5" />
      </div>
    );
  };

  return <div className="mt-5">{renderComponent()}</div>;
};

export default CurrencyDropdown;
