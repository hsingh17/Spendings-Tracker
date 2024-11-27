import { FC } from "react";
import Card from "../../../common/Card";
import { Currency } from "../../../hooks/useCurrencies";
import { Nullable } from "../../../utils/types";
import CurrencyDropdownOption from "./CurrencyDropdownOption";

type CurrencyDropdownOpenProps = {
  currencies: Nullable<Currency[]>;
  isOpen: boolean;
};

const CurrencyDropdownOpen: FC<CurrencyDropdownOpenProps> = ({
  currencies,
  isOpen,
}) => {
  if (!currencies || !isOpen) {
    return <></>;
  }

  return (
    <div className="absolute left-0 top-16 h-80 overflow-y-scroll w-full md:w-fit">
      <Card className="p-5 border-2">
        {currencies?.map((currency, idx) => (
          <CurrencyDropdownOption
            currency={currency}
            isSelected={currency.shortName === "USD"}
            showHorizontalRule={idx !== currencies.length - 1}
          />
        ))}
      </Card>
    </div>
  );
};

export default CurrencyDropdownOpen;
