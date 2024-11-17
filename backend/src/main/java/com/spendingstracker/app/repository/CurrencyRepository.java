package com.spendingstracker.app.repository;

import com.spendingstracker.app.entity.Currency;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.Collection;
import java.util.List;

/**
 * <code>JpaRepository</code> used to make queries to the <code>APP.CURRENCY</code> table.
 *
 * @see Currency
 */
@Repository
public interface CurrencyRepository
        extends CrudRepository<Currency, BigInteger>, AppCacheLoadingRepository<Currency> {
    @Query(
            value =
                    """
                        SELECT
                            C.*
                        FROM
                            APP.CURRENCY C
                        WHERE
                            C.IS_ACTIVE = 'Y'
                    """,
            nativeQuery = true)
    List<Currency> getActiveCurrencies();

    default Collection<Currency> getAllCacheValues() {
        return getActiveCurrencies();
    }
}
