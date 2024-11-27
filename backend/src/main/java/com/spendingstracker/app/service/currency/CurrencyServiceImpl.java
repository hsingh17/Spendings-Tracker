package com.spendingstracker.app.service.currency;

import com.spendingstracker.app.cache.CurrencyJpaCache;
import com.spendingstracker.app.dto.response.CurrenciesListResponse;
import com.spendingstracker.app.dto.response.CurrencyResponse;
import com.spendingstracker.app.entity.Currency;
import com.spendingstracker.app.entity.User;
import com.spendingstracker.app.service.auth.CurrentUserService;

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
    private final CurrentUserService currUserService;

    @Override
    public CurrenciesListResponse getCurrencies(boolean indicateUserCurrency) {
        Collection<Currency> jpaCurrencies = currencyJpaCache.getAllValues();
        List<CurrencyResponse> currencyResponses = new ArrayList<>();
        User user = currUserService.getUserJpaEntity();
        Currency prefCurrency = user.getPrefCurrency();

        for (Currency jpaCurrency : jpaCurrencies) {
            boolean isSelected = prefCurrency.getShortName() == jpaCurrency.getShortName();
            currencyResponses.add(
                    new CurrencyResponse(
                            jpaCurrency.getLongName(),
                            jpaCurrency.getShortName(),
                            jpaCurrency.getSymbol(),
                            jpaCurrency.getFlagImgUrl(),
                            isSelected));
        }

        return new CurrenciesListResponse(currencyResponses);
    }
}
