package com.spendingstracker.app.cache;

import com.spendingstracker.app.constants.CurrencyEnum;
import com.spendingstracker.app.constants.SpendingCategoryEnum;
import com.spendingstracker.app.entity.Currency;
import com.spendingstracker.app.repository.CurrencyRepository;

import org.springframework.stereotype.Component;

import java.util.*;

/**
 * Cache class for loading <code>SPENDING_CATEGORY</code> records into memory on start
 *
 * @see SpendingCategoryEnum
 * @see Currency
 * @see CurrencyEnum
 * @see CurrencyRepository
 * @see AppCache
 */
@Component
public class CurrencyJpaCache extends AppCache<CurrencyEnum, Currency> {
    public CurrencyJpaCache(CurrencyRepository currencyRepository) {
        super(currencyRepository);
    }
}
