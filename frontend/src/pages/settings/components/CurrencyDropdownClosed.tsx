import { Dispatch, FC, SetStateAction } from "react";
import DownChevron from "../../../assets/components/DownChevron";
import UpChevron from "../../../assets/components/UpChevron";
import { Currency } from "../../../hooks/useCurrencies";
import { Nullable } from "../../../utils/types";
import CurrencyDropdownOption from "./CurrencyDropdownOption";

type CurrencyDropdownClosedProps = {
  currency: Nullable<Currency>;
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const CurrencyDropdownClosed: FC<CurrencyDropdownClosedProps> = ({
  currency,
  isOpen,
  setOpen,
}) => {
  if (!currency) {
    return <></>;
  }

  return (
    <div
      className="flex flex-row border-2 border-gray-300 rounded-lg py-3 pl-3 pr-3 w-full md:w-fit items-center hover:cursor-pointer hover:border-gray-500"
      onClick={() => setOpen(!isOpen)}
    >
      <CurrencyDropdownOption
        currency={currency}
        showHorizontalRule={false}
        isSelected={false}
        animateHover={false}
      />

      {isOpen ? (
        <UpChevron className="ml-16 w-5 h-5" />
      ) : (
        <DownChevron className="ml-16 w-5 h-5" />
      )}
    </div>
  );
};

export default CurrencyDropdownClosed;
