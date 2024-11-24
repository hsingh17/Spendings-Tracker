package com.spendingstracker.app.dto.response;

import com.spendingstracker.app.constants.CurrencyEnum;

/**
 * Response object for a currency
 *
 * @param longName
 * @param shortName
 * @param symbol
 * @param flagImgUrl
 * @see com.spendingstracker.app.entity.Currency
 */
public record CurrencyResponse(
        String longName, CurrencyEnum shortName, String symbol, String flagImgUrl) {}
