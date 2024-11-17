package com.spendingstracker.app.repository;

import java.util.Collection;

/**
 * Repository to indicate this repository can load the <code>AppCache</code> class
 *
 * @see com.spendingstracker.app.cache.AppCache
 */
public interface AppCacheLoadingRepository<V> {
    Collection<V> getAllCacheValues();
}
