enum Currency {
  USD,
  EUR,
  JPY,
  GBP,
  AUD,
  CAD,
  CHF,
  CNH,
  HKD,
  NZD,
}

type CurrencyObj = {
  currency: Currency;
  name: string;
  symbol: string;
  emojiHex: string;
};

export const CURRENCIES: CurrencyObj[] = [
  { currency: Currency.USD, name: "Us Dollar", symbol: "$", emojiHex: "" },
  { currency: Currency.EUR, name: "Euro", symbol: "€", emojiHex: "" },
  { currency: Currency.JPY, name: "Japanese Yen", symbol: "¥", emojiHex: "" },
  { currency: Currency.GBP, name: "Pound Sterling", symbol: "£", emojiHex: "" },
  { currency: Currency.AUD, name: "Australian Dollar", symbol: "$", emojiHex: "" },
  { currency: Currency.CAD, name: "Canadian Dollar", symbol: "$", emojiHex: "" },
  { currency: Currency.CHF, name: "Swiss Franc", symbol: "₣", emojiHex: "" },
  { currency: Currency.CNH, name: "Chinese Renminbi", symbol: "¥", emojiHex: "" },
  { currency: Currency.HKD, name: "Hong Kong Dollar", symbol: "$", emojiHex: "" },
  { currency: Currency.NZD, name: "New Zealand Dollar", symbol: "$", emojiHex: "" },
];
