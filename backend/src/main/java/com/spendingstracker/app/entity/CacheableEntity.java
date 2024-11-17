package com.spendingstracker.app.entity;

/**
 * Interface for entities that are cacheable by <code>AppCache</code>
 *
 * @see com.spendingstracker.app.cache.AppCache
 */
public interface CacheableEntity<K> {
    K getCacheKey();
}
