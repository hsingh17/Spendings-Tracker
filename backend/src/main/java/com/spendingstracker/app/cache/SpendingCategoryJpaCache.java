package com.spendingstracker.app.cache;

import com.spendingstracker.app.constants.SpendingCategoryEnum;
import com.spendingstracker.app.entity.SpendingCategory;
import com.spendingstracker.app.repository.SpendingCategoryRepositoryApp;

import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Component;

import java.util.*;

/**
 * Cache class for loading <code>SPENDING_CATEGORY</code> records into memory on start
 *
 * @see SpendingCategoryEnum
 * @see SpendingCategory
 * @see SpendingCategoryRepositoryApp
 * @see AppCache
 */
@Component
@Slf4j
public class SpendingCategoryJpaCache extends AppCache<SpendingCategoryEnum, SpendingCategory> {
    public SpendingCategoryJpaCache(SpendingCategoryRepositoryApp spendingCategoryRepository) {
        super(spendingCategoryRepository);
    }
}
