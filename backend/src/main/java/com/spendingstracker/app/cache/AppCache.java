package com.spendingstracker.app.cache;

import com.spendingstracker.app.entity.CacheableEntity;
import com.spendingstracker.app.repository.AppCacheLoadingRepository;

import lombok.extern.slf4j.Slf4j;

import java.util.*;

/** Generic cache class */
@Slf4j
public abstract class AppCache<K, V extends CacheableEntity<K>> {
    private Map<K, V> cache;
    private final AppCacheLoadingRepository<V> appCacheLoadingRepository;

    protected AppCache(AppCacheLoadingRepository<V> appCacheLoadingRepository) {
        this.appCacheLoadingRepository = appCacheLoadingRepository;
        loadCache();
    }

    private void loadCache() {
        Map<K, V> temp = new HashMap<>();
        for (V val : appCacheLoadingRepository.getAllCacheValues()) {
            temp.put(val.getCacheKey(), val);
        }

        cache = Collections.unmodifiableMap(temp);
    }

    public V getFromCache(K key) {
        log.debug("Finding key for value {}", key);

        if (cache.containsKey(key)) {
            return cache.get(key);
        }

        // Cache miss
        loadCache();
        if (cache.containsKey(key)) {
            return cache.get(key);
        }

        log.warn("No value found for key {}", key);
        return null;
    }

    public Collection<K> getAllKeys() {
        log.debug("Getting all keys from cache");
        return cache.keySet();
    }

    public Collection<V> getAllValues() {
        log.debug("Getting all values from cache");
        return cache.values();
    }
}
