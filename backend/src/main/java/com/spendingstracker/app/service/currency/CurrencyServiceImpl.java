package com.spendingstracker.app.service.currency;

import com.spendingstracker.app.cache.CurrencyJpaCache;
import com.spendingstracker.app.dto.response.CurrenciesListResponse;
import com.spendingstracker.app.dto.response.CurrencyResponse;
import com.spendingstracker.app.entity.Currency;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CurrencyServiceImpl implements CurrencyService {
    private final CurrencyJpaCache currencyJpaCache;

    @Override
    public CurrenciesListResponse getCurrencies() {
        Collection<Currency> jpaCurrencies = currencyJpaCache.getAllValues();
        List<CurrencyResponse> currencyResponses = new ArrayList<>();

        for (Currency jpaCurrency : jpaCurrencies) {
            currencyResponses.add(
                    new CurrencyResponse(
                            jpaCurrency.getLongName(),
                            jpaCurrency.getShortName(),
                            jpaCurrency.getSymbol(),
                            jpaCurrency.getFlagImgUrl()));
        }

        // TODO: Indicate user's currently preferred currency

        return new CurrenciesListResponse(currencyResponses);
    }
}
