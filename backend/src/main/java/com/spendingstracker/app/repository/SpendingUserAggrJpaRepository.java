package com.spendingstracker.app.repository;

import com.spendingstracker.app.entity.SpendingUserAggr;
import com.spendingstracker.app.entity.User;
import com.spendingstracker.app.projection.SpendingProjection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * <code>JpaRepository</code> used to make queries to the <code>APP>.SPENDING_USER_AGGR</code>
 * table.
 *
 * @see SpendingUserAggrRepository
 * @see SpendingUserAggr
 */
@Repository
public interface SpendingUserAggrJpaRepository extends JpaRepository<SpendingUserAggr, BigInteger> {

    Optional<SpendingUserAggr> findSpendingUserAggrByUserAndDate(User user, LocalDate date);

    @Query(
            value =
                    """
                    SELECT
                        S.SPENDING_ID AS spendingId,
                        SC.NAME AS category,
                        S.AMOUNT AS amount,
                        S.MEMO AS memo
                    FROM
                        APP.SPENDING_USER_AGGR SUA,
                        APP.SPENDING S,
                        APP.SPENDING_CATEGORY SC
                    WHERE
                            SUA.SPENDING_USER_AGGR_ID = S.SPENDING_USER_AGGR_ID
                        AND S.SPENDING_CATEGORY_ID = SC.SPENDING_CATEGORY_ID
                        AND SUA.USER_ID = :userId
                        AND SUA.DATE = :date
                """,
            nativeQuery = true)
    List<SpendingProjection> findSpendingDetailsByUserIdAndDate(
            @Param("date") LocalDate date, @Param("userId") BigInteger userId);
}
