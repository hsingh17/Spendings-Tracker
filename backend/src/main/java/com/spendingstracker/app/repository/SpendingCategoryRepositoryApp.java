package com.spendingstracker.app.repository;

import com.spendingstracker.app.entity.SpendingCategory;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.Collection;
import java.util.List;

/**
 * <code>JpaRepository</code> used to make queries to the <code>APP.SPENDING_CATEGORY</code> table.
 *
 * @see SpendingCategory
 */
@Repository
public interface SpendingCategoryRepositoryApp
        extends CrudRepository<SpendingCategory, BigInteger>,
                AppCacheLoadingRepository<SpendingCategory> {
    @Query(
            value =
                    """
                        SELECT
                            SC.*
                        FROM
                            APP.SPENDING_CATEGORY SC
                        WHERE
                            SC.IS_ACTIVE = 'Y'
                    """,
            nativeQuery = true)
    List<SpendingCategory> getActiveSpendingCategories();

    default Collection<SpendingCategory> getAllCacheValues() {
        return getActiveSpendingCategories();
    }
}
