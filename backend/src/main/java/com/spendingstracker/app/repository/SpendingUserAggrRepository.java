package com.spendingstracker.app.repository;

import com.spendingstracker.app.constants.Granularity;
import com.spendingstracker.app.entity.SpendingUserAggr;
import com.spendingstracker.app.entity.User;
import com.spendingstracker.app.projection.SpendingListProjection;
import com.spendingstracker.app.projection.SpendingProjection;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * <code>JpaRepository</code> used to make queries to the <code>APP>.SPENDING_USER_AGGR</code>
 * table.
 *
 * @see SpendingUserAggr
 * @see SpendingUserAggrRepositoryImpl
 */
@Repository
public interface SpendingUserAggrRepository {
    /**
     * Save's <code>spendingUserAggr</code> to database
     *
     * @param spendingUserAggr <code>SpendingUserAggr</code> object to save
     * @return <code>SpendingUserAggr</code> object after saving (with primary key)
     */
    SpendingUserAggr save(SpendingUserAggr spendingUserAggr);

    /**
     * Deletes the <code>SpendingUserAggr</code> record with primary key <code>spendingUserAggrId
     * </code>
     */
    void deleteById(BigInteger spendingUserAggrId);

    /**
     * Finds the <code>SpendingUserAggr</code> record with <code>user</code> and <code>date</code>
     *
     * @return <code>Optional{@literal <SpendingUserAggr>}</code> that may contain a <code>
     *     SpendingUserAggr</code> record
     */
    Optional<SpendingUserAggr> findSpendingUserAggrByUserAndDate(User user, LocalDate date);

    /**
     * Find's all the spendings associated to a particular spending date by <code>user</code> and
     * <code>date</code>
     *
     * @return <code>List{@literal <SpendingProjection>}</code> that contains the specific spendings
     *     for a day
     * @see SpendingProjection
     */
    List<SpendingProjection> findSpendingDetailsByUserIdAndDate(LocalDate date, BigInteger userId);

    /** Find's spendings by grouping them by <code>granularity</code> */
    Page<SpendingListProjection> findSpendingsNumericalGroupBy(
            BigInteger userId,
            LocalDate startDate,
            LocalDate endDate,
            Granularity granularity,
            Pageable pageable);

    /** Find spendings by grouping by them by their category */
    Page<SpendingListProjection> findSpendingsCategorical(
            BigInteger userId, LocalDate startDate, LocalDate endDate, Pageable pageable);
}
