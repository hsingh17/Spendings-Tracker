package com.spendingstracker.app.repository;

import com.spendingstracker.app.entity.SpendingUserAggr;
import com.spendingstracker.app.entity.User;
import com.spendingstracker.app.projection.SpendingListProjection;
import com.spendingstracker.app.projection.SpendingProjection;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
 * @see SpendingUserAggr
 */
@Repository
public interface SpendingUserAggrRepository extends JpaRepository<SpendingUserAggr, BigInteger> {

    Optional<SpendingUserAggr> findSpendingUserAggrByUserAndDate(User user, LocalDate date);

    @Query(
            value =
                    """
                    SELECT
                        S.SPENDING_ID AS spendingId,
                        SC.NAME AS category,
                        S.AMOUNT AS amount
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

    @Query(
            value =
                    """
                    SELECT
                        MAX(SUA.SPENDING_USER_AGGR_ID) AS spendingUserAggrId,
                        DATE_FORMAT (SUA.DATE, "%Y-%m-%d") AS date,
                        SUM(S.AMOUNT) AS total
                    FROM
                        APP.SPENDING_USER_AGGR SUA,
                        APP.SPENDING S
                    WHERE
                            SUA.SPENDING_USER_AGGR_ID = S.SPENDING_USER_AGGR_ID
                        AND SUA.USER_ID = :userId
                        AND SUA.DATE >= :startDate
                        AND SUA.DATE <= :endDate
                    GROUP BY
                        DATE_FORMAT (SUA.DATE, "%Y-%m-%d")
                    ORDER BY
                        DATE_FORMAT (SUA.DATE, "%Y-%m-%d") DESC
                    """,
            countQuery =
                    """
                    SELECT
                        COUNT(*)
                    FROM
                        APP.SPENDING_USER_AGGR SUA,
                        APP.SPENDING S
                    WHERE
                            SUA.SPENDING_USER_AGGR_ID = S.SPENDING_USER_AGGR_ID
                        AND SUA.USER_ID = :userId
                        AND SUA.DATE >= :startDate
                        AND SUA.DATE <= :endDate
                    GROUP BY
                        DATE_FORMAT (SUA.DATE, "%Y-%m-%d")
                    ORDER BY
                        DATE_FORMAT (SUA.DATE, "%Y-%m-%d") DESC
                    """,
            nativeQuery = true)
    Page<SpendingListProjection> findSpendingsNumericalGroupByDay(
            @Param("userId") BigInteger userId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate,
            Pageable pageable);

    @Query(
            value =
                    """
                    SELECT
                        MAX(SUA.SPENDING_USER_AGGR_ID) AS spendingUserAggrId,
                        DATE_FORMAT (
                            DATE_SUB(SUA.DATE, INTERVAL WEEKDAY (SUA.DATE) DAY),
                            "%Y-%m-%d"
                        ) AS date,
                        SUM(S.AMOUNT) AS total
                    FROM
                        APP.SPENDING_USER_AGGR SUA,
                        APP.SPENDING S
                    WHERE
                            SUA.SPENDING_USER_AGGR_ID = S.SPENDING_USER_AGGR_ID
                        AND SUA.USER_ID = :userId
                        AND SUA.DATE >= :startDate
                        AND SUA.DATE <= :endDate
                    GROUP BY
                        DATE_FORMAT (
                            DATE_SUB(SUA.DATE, INTERVAL WEEKDAY (SUA.DATE) DAY),
                            "%Y-%m-%d"
                        )
                    ORDER BY
                        DATE_FORMAT (
                            DATE_SUB(SUA.DATE, INTERVAL WEEKDAY (SUA.DATE) DAY),
                            "%Y-%m-%d"
                        ) DESC
                    """,
            countQuery =
                    """
                    SELECT
                        COUNT(*)
                    FROM
                        APP.SPENDING_USER_AGGR SUA,
                        APP.SPENDING S
                    WHERE
                            SUA.SPENDING_USER_AGGR_ID = S.SPENDING_USER_AGGR_ID
                        AND SUA.USER_ID = :userId
                        AND SUA.DATE >= :startDate
                        AND SUA.DATE <= :endDate
                    GROUP BY
                        DATE_FORMAT (
                            DATE_SUB(SUA.DATE, INTERVAL WEEKDAY (SUA.DATE) DAY),
                            "%Y-%m-%d"
                        )
                    ORDER BY
                        DATE_FORMAT (
                            DATE_SUB(SUA.DATE, INTERVAL WEEKDAY (SUA.DATE) DAY),
                            "%Y-%m-%d"
                        ) DESC
                    """,
            nativeQuery = true)
    Page<SpendingListProjection> findSpendingsNumericalGroupByWeek(
            @Param("userId") BigInteger userId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate,
            Pageable pageable);

    @Query(
            value =
                    """
                    SELECT
                        MAX(SUA.SPENDING_USER_AGGR_ID) AS spendingUserAggrId,
                        DATE_FORMAT(SUA.DATE, "%Y-%m-01") AS date,
                        SUM(S.AMOUNT) AS total
                    FROM
                        APP.SPENDING_USER_AGGR SUA,
                        APP.SPENDING S
                    WHERE
                            SUA.SPENDING_USER_AGGR_ID = S.SPENDING_USER_AGGR_ID
                        AND SUA.USER_ID = :userId
                        AND SUA.DATE >= :startDate
                        AND SUA.DATE <= :endDate
                    GROUP BY
                        DATE_FORMAT(SUA.DATE, "%Y-%m-01")
                    ORDER BY
                        DATE_FORMAT(SUA.DATE, "%Y-%m-01") DESC
                    """,
            countQuery =
                    """
                    SELECT
                        COUNT(*)
                    FROM
                        APP.SPENDING_USER_AGGR SUA,
                        APP.SPENDING S
                    WHERE
                            SUA.SPENDING_USER_AGGR_ID = S.SPENDING_USER_AGGR_ID
                        AND SUA.USER_ID = :userId
                        AND SUA.DATE >= :startDate
                        AND SUA.DATE <= :endDate
                    GROUP BY
                        DATE_FORMAT(SUA.DATE, "%Y-%m-01")
                    ORDER BY
                        DATE_FORMAT(SUA.DATE, "%Y-%m-01") DESC
                    """,
            nativeQuery = true)
    Page<SpendingListProjection> findSpendingsNumericalGroupByMonth(
            @Param("userId") BigInteger userId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate,
            Pageable pageable);

    @Query(
            value =
                    """
                    SELECT
                        MAX(SUA.SPENDING_USER_AGGR_ID) AS spendingUserAggrId,
                        DATE_FORMAT(SUA.DATE, "%Y-01-01") AS date,
                        SUM(S.AMOUNT) AS total
                    FROM
                        APP.SPENDING_USER_AGGR SUA,
                        APP.SPENDING S
                    WHERE
                            SUA.SPENDING_USER_AGGR_ID = S.SPENDING_USER_AGGR_ID
                        AND SUA.USER_ID = :userId
                        AND SUA.DATE >= :startDate
                        AND SUA.DATE <= :endDate
                    GROUP BY
                        DATE_FORMAT(SUA.DATE, "%Y-01-01")
                    ORDER BY
                        DATE_FORMAT(SUA.DATE, "%Y-01-01") DESC
                    """,
            countQuery =
                    """
                    SELECT
                        COUNT(*)
                    FROM
                        APP.SPENDING_USER_AGGR SUA,
                        APP.SPENDING S
                    WHERE
                            SUA.SPENDING_USER_AGGR_ID = S.SPENDING_USER_AGGR_ID
                        AND SUA.USER_ID = :userId
                        AND SUA.DATE >= :startDate
                        AND SUA.DATE <= :endDate
                    GROUP BY
                        DATE_FORMAT(SUA.DATE, "%Y-01-01")
                    ORDER BY
                        DATE_FORMAT(SUA.DATE, "%Y-01-01") DESC
                    """,
            nativeQuery = true)
    Page<SpendingListProjection> findSpendingsNumericalGroupByYear(
            @Param("userId") BigInteger userId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate,
            Pageable pageable);

    @Query(
            value =
                    """
                    SELECT
                        SC.NAME as category,
                        SUM(S.AMOUNT) as total
                    FROM
                        APP.SPENDING_USER_AGGR SUA,
                        APP.SPENDING S,
                        APP.SPENDING_CATEGORY SC
                    WHERE
                            SUA.SPENDING_USER_AGGR_ID = S.SPENDING_USER_AGGR_ID
                        AND S.SPENDING_CATEGORY_ID = SC.SPENDING_CATEGORY_ID
                        AND SUA.USER_ID = :userId
                        AND SUA.DATE >= :startDate
                        AND SUA.DATE <= :endDate
                    GROUP BY
                        SC.NAME
                    ORDER BY
                        SUM(S.AMOUNT) DESC
                    """,
            countQuery =
                    """
                    SELECT
                        COUNT(*)
                    FROM
                        APP.SPENDING_USER_AGGR SUA,
                        APP.SPENDING S,
                        APP.SPENDING_CATEGORY SC
                    WHERE
                            SUA.SPENDING_USER_AGGR_ID = S.SPENDING_USER_AGGR_ID
                        AND S.SPENDING_CATEGORY_ID = SC.SPENDING_CATEGORY_ID
                        AND SUA.USER_ID = :userId
                        AND SUA.DATE >= :startDate
                        AND SUA.DATE <= :endDate
                    GROUP BY
                        SC.NAME
                    ORDER BY
                        SUM(S.AMOUNT) DESC
                    """,
            nativeQuery = true)
    Page<SpendingListProjection> findSpendingsCategorical(
            @Param("userId") BigInteger userId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate,
            Pageable pageable);
}
