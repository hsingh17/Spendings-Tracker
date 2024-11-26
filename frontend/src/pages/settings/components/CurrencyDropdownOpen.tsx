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
    <div className="absolute left-0 top-16 h-52 overflow-y-scroll">
      <Card className="p-5">
        {currencies?.map((currency) => (
          <CurrencyDropdownOption
            currency={currency}
            isSelected={currency.shortName === "USD"}
          />
        ))}
      </Card>
    </div>
  );
};

export default CurrencyDropdownOpen;
