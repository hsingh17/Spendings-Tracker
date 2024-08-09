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
 */
@Repository
public interface SpendingUserAggrRepository {

    Optional<SpendingUserAggr> findSpendingUserAggrByUserAndDate(User user, LocalDate date);

    List<SpendingProjection> findSpendingDetailsByUserIdAndDate(LocalDate date, BigInteger userId);

    Page<SpendingListProjection> findSpendingsNumericalGroupBy(
            BigInteger userId,
            LocalDate startDate,
            LocalDate endDate,
            Granularity granularity,
            Pageable pageable);
}
