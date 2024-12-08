import { Dispatch, FC, SetStateAction } from "react";
import Card from "../../../common/Card";
import { Currency } from "../../../hooks/useCurrencies";
import useUpdateCurrency from "../../../hooks/useUpdateCurrency";
import { Nullable } from "../../../utils/types";
import CurrencyDropdownOption from "./CurrencyDropdownOption";

type CurrencyDropdownOpenProps = {
  currencies: Nullable<Currency[]>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const CurrencyDropdownOpen: FC<CurrencyDropdownOpenProps> = ({
  currencies,
  isOpen,
  setIsOpen,
}) => {
  const { mutate: updateCurrency } = useUpdateCurrency();

  const onClick = (currency: Currency) => {
    updateCurrency({ currency: currency.shortName });
    setIsOpen(false);
  };

  if (!currencies || !isOpen) {
    return <></>;
  }

  return (
    <div className="absolute left-0 top-16 h-80 overflow-y-scroll w-full md:w-fit">
      <Card className="p-5 border-2">
        {currencies?.map((currency, idx) => (
          <CurrencyDropdownOption
            key={currency.shortName}
            currency={currency}
            isSelected={currency.isSelected}
            showHorizontalRule={idx !== currencies.length - 1}
            onClick={onClick}
          />
        ))}
      </Card>
    </div>
  );
};

export default CurrencyDropdownOpen;
