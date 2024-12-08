package com.spendingstracker.app.service.currency;

import com.spendingstracker.app.dto.requests.UpdateCurrencyRequest;
import com.spendingstracker.app.dto.response.CurrenciesListResponse;
import com.spendingstracker.app.dto.response.CurrencyResponse;
import com.spendingstracker.app.entity.Currency;

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

    /**
     * Changes the user's currency
     *
     * @param updateCurrencyRequest request object that holds information on what currency to switch
     *     to
     * @see UpdateCurrencyRequest
     */
    void updateUserCurrency(UpdateCurrencyRequest updateCurrencyRequest);

    /**
     * @return user's current currency object
     * @see Currency
     */
    CurrencyResponse getUserCurrency();
}
