package com.spendingstracker.app.service.currency;

import com.spendingstracker.app.dto.response.CurrenciesListResponse;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface CurrencyService {
    /**
     * @return All active and available currencies
     */
    CurrenciesListResponse getCurrencies();
}
