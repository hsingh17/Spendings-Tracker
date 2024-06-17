package com.spendingstracker.app.cache;

import com.spendingstracker.app.constants.SpendingCategoryEnum;
import com.spendingstracker.app.entity.SpendingCategory;
import com.spendingstracker.app.repository.SpendingCategoryRepository;

import lombok.extern.slf4j.Slf4j;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

/**
 * Cache class for loading <code>SPENDING_CATEGORY</code> records into memory on start
 *
 * @see SpendingCategoryEnum
 * @see SpendingCategory
 * @see SpendingCategoryRepository
 */
@Slf4j
public class SpendingCategoryJpaCache {
    private Map<SpendingCategoryEnum, SpendingCategory> cache;

    private final SpendingCategoryRepository spendingCategoryRepository;

    public SpendingCategoryJpaCache(SpendingCategoryRepository spendingCategoryRepository) {
        this.spendingCategoryRepository = spendingCategoryRepository;
        loadCache();
    }

    private void loadCache() {
        Map<SpendingCategoryEnum, SpendingCategory> temp = new HashMap<>();
        for (SpendingCategory spendingCategory : spendingCategoryRepository.findAll()) {
            temp.put(spendingCategory.getName(), spendingCategory);
        }

        cache = Collections.unmodifiableMap(temp);
    }

    public SpendingCategory getFromCache(SpendingCategoryEnum spendingCategoryEnum) {
        log.debug(
                "Finding SpendingCategory entity for SpendingCategoryEnum {}",
                spendingCategoryEnum);

        if (cache.containsKey(spendingCategoryEnum)) {
            return cache.get(spendingCategoryEnum);
        }

        // Cache miss
        loadCache();
        if (cache.containsKey(spendingCategoryEnum)) {
            return cache.get(spendingCategoryEnum);
        }

        log.warn(
                "No SpendingCategory entity found for SpendingCategoryEnum {}."
                        + "Creating entity for it.",
                spendingCategoryEnum);

        SpendingCategory spendingCategory = new SpendingCategory(spendingCategoryEnum);
        spendingCategoryRepository.save(spendingCategory);

        return spendingCategory;
    }
}
