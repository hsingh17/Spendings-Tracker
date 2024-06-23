package com.spendingstracker.app.repository;

import com.spendingstracker.app.entity.SpendingCategory;
import com.spendingstracker.app.entity.UserRegistration;

import com.spendingstracker.app.projection.SpendingCategoryProjection;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.List;

/**
 * <code>JpaRepository</code> used to make queries to the <code>APP>.SPENDING_CATEGORY</code> table.
 *
 * @see SpendingCategory
 */
@Repository
public interface SpendingCategoryRepository extends CrudRepository<SpendingCategory, BigInteger> {
    @Query(
            value =
                    """
                        SELECT
                            SC.NAME name,
                            SC.S3_KEY s3Key
                        FROM
                            APP.SPENDING_CATEGORY SC
                        WHERE
                            SC.IS_ACTIVE = "Y"
                    """,
            nativeQuery = true)
    List<SpendingCategoryProjection> getActiveSpendingCategories();
}
