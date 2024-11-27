package com.spendingstracker.app.service.currency;

import com.spendingstracker.app.dto.response.CurrenciesListResponse;

import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface CurrencyService {
    /**
     * @return All active and available currencies. If <code>indicateUserCurrency</code> is <code>
     *     true</code> then indicate which currency is user's selected currency.
     * @param indicateUserCurrency flag to determine if the user's selected currency should be
     *     indicated in response
     */
    CurrenciesListResponse getCurrencies(boolean indicateUserCurrency);
}
