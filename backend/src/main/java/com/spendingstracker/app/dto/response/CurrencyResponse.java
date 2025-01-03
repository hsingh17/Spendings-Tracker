package com.spendingstracker.app.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.spendingstracker.app.constants.CurrencyEnum;
import com.spendingstracker.app.entity.Currency;

/**
 * Response object for a currency
 *
 * @param longName
 * @param shortName
 * @param symbol
 * @param flagImgUrl
 * @param isSelected indicates if the user is using this currency as their currency to display
 *     spendings in
 * @see com.spendingstracker.app.entity.Currency
 */
@JsonInclude(value = JsonInclude.Include.NON_NULL)
public record CurrencyResponse(
        String longName,
        CurrencyEnum shortName,
        String symbol,
        String flagImgUrl,
        boolean isSelected) {
    public CurrencyResponse(Currency currency, boolean isSelected) {
        this(
                currency.getLongName(),
                currency.getShortName(),
                currency.getSymbol(),
                currency.getFlagImgUrl(),
                isSelected);
    }
}
