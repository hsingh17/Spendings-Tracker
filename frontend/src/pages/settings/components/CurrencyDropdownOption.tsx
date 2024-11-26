import { FC } from "react";
import { Currency } from "../../../hooks/useCurrencies";

const HOVER_CLASS_NAME =
  "hover:bg-theme-cta hover:bg-opacity-20 hover:p-2 hover:rounded-lg hover:cursor-pointer";

type CurrencyDropdownOptionProps = {
  currency: Currency;
  showHorizontalRule?: boolean;
  isSelected: boolean;
  animateHover?: boolean;
};

const CurrencyDropdownOption: FC<CurrencyDropdownOptionProps> = ({
  currency,
  showHorizontalRule = true,
  isSelected,
  animateHover = true,
}) => {
  const getClassName = (): string => {
    let ret = "";

    if (animateHover) {
      ret += HOVER_CLASS_NAME;
    }

    return ret;
  };

  if (isSelected) {
    return <></>;
  }

  return (
    <div className="w-full md:w-fit">
      <div className={getClassName()}>
        <div className="w-fit flex flex-row items-center">
          <img
            src={currency.flagImgUrl}
            width={50}
            alt={currency.longName}
            className="border-2 border-black"
          />

          <p className="ml-3 font-semibold text-lg">{currency.longName}</p>
        </div>
      </div>

      {showHorizontalRule && (
        <hr className="mt-5 mb-3 border-slate-300 w-full md:w-64" />
      )}
    </div>
  );
};

export default CurrencyDropdownOption;
