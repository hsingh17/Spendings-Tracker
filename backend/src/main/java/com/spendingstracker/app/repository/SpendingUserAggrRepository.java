package com.spendingstracker.app.repository;

import com.spendingstracker.app.entity.SpendingUserAggr;
import com.spendingstracker.app.entity.User;
import com.spendingstracker.app.projection.SpendingsListProjection;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.Optional;

@Repository
public interface SpendingUserAggrRepository extends JpaRepository<SpendingUserAggr, Long> {

    Optional<SpendingUserAggr> findSpendingUserAggrByUserAndDate(User user, Date date);

    @Query(
            value =
                    " SELECT "
                            + " 	MAX(SUA.SPENDING_USER_AGGR_ID) AS spendingUserAggrId, "
                            + " 	DATE_FORMAT(SUA.DATE, \"%Y-%m-%d\") AS date, "
                            + " 	SUM(S.AMOUNT) AS total"
                            + " FROM  "
                            + " 	APP.SPENDING_USER_AGGR SUA, "
                            + " 	APP.SPENDING S "
                            + " WHERE  "
                            + " 		SUA.SPENDING_USER_AGGR_ID = S.SPENDING_USER_AGGR_ID  "
                            + " 	AND SUA.USER_ID = :userId "
                            + " 	AND SUA.DATE >= :startDate "
                            + " 	AND SUA.DATE <= :endDate "
                            + " GROUP BY  "
                            + " 	DATE_FORMAT(SUA.DATE, \"%Y-%m-%d\") "
                            + " ORDER BY  "
                            + " 	DATE_FORMAT(SUA.DATE, \"%Y-%m-%d\") DESC  ",
            countQuery =
                    " SELECT "
                            + " 	COUNT(*) "
                            + " FROM  "
                            + " 	APP.SPENDING_USER_AGGR SUA, "
                            + " 	APP.SPENDING S "
                            + " WHERE  "
                            + " 		SUA.SPENDING_USER_AGGR_ID = S.SPENDING_USER_AGGR_ID  "
                            + " 	AND SUA.USER_ID = :userId "
                            + " 	AND SUA.DATE >= :startDate "
                            + " 	AND SUA.DATE <= :endDate "
                            + " GROUP BY  "
                            + " 	DATE_FORMAT(SUA.DATE, \"%Y-%m-%d\") "
                            + " ORDER BY  "
                            + " 	DATE_FORMAT(SUA.DATE, \"%Y-%m-%d\") DESC  ",
            nativeQuery = true)
    Page<SpendingsListProjection> findSpendingsNumericalGroupByDay(
            @Param("userId") long userId,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            Pageable pageable);

    @Query(
            value =
                    " SELECT "
                            + " 	MAX(SUA.SPENDING_USER_AGGR_ID) AS spendingUserAggrId, "
                            + " 	DATE_FORMAT(DATE_SUB(SUA.DATE, INTERVAL WEEKDAY(SUA.DATE) DAY), \"%Y-%m-%d\") AS date, "
                            + " 	SUM(S.AMOUNT) AS total"
                            + " FROM  "
                            + " 	APP.SPENDING_USER_AGGR SUA, "
                            + " 	APP.SPENDING S "
                            + " WHERE  "
                            + " 		SUA.SPENDING_USER_AGGR_ID = S.SPENDING_USER_AGGR_ID  "
                            + " 	AND SUA.USER_ID = :userId "
                            + " 	AND SUA.DATE >= :startDate "
                            + " 	AND SUA.DATE <= :endDate "
                            + " GROUP BY  "
                            + " 	DATE_FORMAT(DATE_SUB(SUA.DATE, INTERVAL WEEKDAY(SUA.DATE) DAY), \"%Y-%m-%d\") "
                            + " ORDER BY  "
                            + " 	DATE_FORMAT(DATE_SUB(SUA.DATE, INTERVAL WEEKDAY(SUA.DATE) DAY), \"%Y-%m-%d\") DESC  ",
            countQuery =
                    " SELECT "
                            + " 	COUNT(*) "
                            + " FROM  "
                            + " 	APP.SPENDING_USER_AGGR SUA, "
                            + " 	APP.SPENDING S "
                            + " WHERE  "
                            + " 		SUA.SPENDING_USER_AGGR_ID = S.SPENDING_USER_AGGR_ID  "
                            + " 	AND SUA.USER_ID = :userId "
                            + " 	AND SUA.DATE >= :startDate "
                            + " 	AND SUA.DATE <= :endDate "
                            + " GROUP BY  "
                            + " 	DATE_FORMAT(DATE_SUB(SUA.DATE, INTERVAL WEEKDAY(SUA.DATE) DAY), \"%Y-%m-%d\") "
                            + " ORDER BY  "
                            + " 	DATE_FORMAT(DATE_SUB(SUA.DATE, INTERVAL WEEKDAY(SUA.DATE) DAY), \"%Y-%m-%d\") DESC  ",
            nativeQuery = true)
    Page<SpendingsListProjection> findSpendingsNumericalGroupByWeek(
            @Param("userId") long userId,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            Pageable pageable);

    @Query(
            value =
                    " SELECT "
                            + " 	MAX(SUA.SPENDING_USER_AGGR_ID) AS spendingUserAggrId, "
                            + " 	DATE_FORMAT(SUA.DATE, \"%Y-%m-01\") AS date, "
                            + " 	SUM(S.AMOUNT) AS total"
                            + " FROM  "
                            + " 	APP.SPENDING_USER_AGGR SUA, "
                            + " 	APP.SPENDING S "
                            + " WHERE  "
                            + " 		SUA.SPENDING_USER_AGGR_ID = S.SPENDING_USER_AGGR_ID  "
                            + " 	AND SUA.USER_ID = :userId "
                            + " 	AND SUA.DATE >= :startDate "
                            + " 	AND SUA.DATE <= :endDate "
                            + " GROUP BY  "
                            + " 	DATE_FORMAT(SUA.DATE, \"%Y-%m-01\") "
                            + " ORDER BY  "
                            + " 	DATE_FORMAT(SUA.DATE, \"%Y-%m-01\") DESC  ",
            countQuery =
                    " SELECT "
                            + " 	COUNT(*) "
                            + " FROM  "
                            + " 	APP.SPENDING_USER_AGGR SUA, "
                            + " 	APP.SPENDING S "
                            + " WHERE  "
                            + " 		SUA.SPENDING_USER_AGGR_ID = S.SPENDING_USER_AGGR_ID  "
                            + " 	AND SUA.USER_ID = :userId "
                            + " 	AND SUA.DATE >= :startDate "
                            + " 	AND SUA.DATE <= :endDate "
                            + " GROUP BY  "
                            + " 	DATE_FORMAT(SUA.DATE, \"%Y-%m-01\") "
                            + " ORDER BY  "
                            + " 	DATE_FORMAT(SUA.DATE, \"%Y-%m-01\") DESC  ",
            nativeQuery = true)
    Page<SpendingsListProjection> findSpendingsNumericalGroupByMonth(
            @Param("userId") long userId,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            Pageable pageable);

    @Query(
            value =
                    " SELECT "
                            + " 	MAX(SUA.SPENDING_USER_AGGR_ID) AS spendingUserAggrId, "
                            + " 	DATE_FORMAT(SUA.DATE, \"%Y-01-01\") AS date, "
                            + " 	SUM(S.AMOUNT) AS total"
                            + " FROM  "
                            + " 	APP.SPENDING_USER_AGGR SUA, "
                            + " 	APP.SPENDING S "
                            + " WHERE  "
                            + " 		SUA.SPENDING_USER_AGGR_ID = S.SPENDING_USER_AGGR_ID  "
                            + " 	AND SUA.USER_ID = :userId "
                            + " 	AND SUA.DATE >= :startDate "
                            + " 	AND SUA.DATE <= :endDate "
                            + " GROUP BY  "
                            + " 	DATE_FORMAT(SUA.DATE, \"%Y-01-01\") "
                            + " ORDER BY  "
                            + " 	DATE_FORMAT(SUA.DATE, \"%Y-01-01\") DESC  ",
            countQuery =
                    " SELECT "
                            + " 	COUNT(*) "
                            + " FROM  "
                            + " 	APP.SPENDING_USER_AGGR SUA, "
                            + " 	APP.SPENDING S "
                            + " WHERE  "
                            + " 		SUA.SPENDING_USER_AGGR_ID = S.SPENDING_USER_AGGR_ID  "
                            + " 	AND SUA.USER_ID = :userId "
                            + " 	AND SUA.DATE >= :startDate "
                            + " 	AND SUA.DATE <= :endDate "
                            + " GROUP BY  "
                            + " 	DATE_FORMAT(SUA.DATE, \"%Y-01-01\") "
                            + " ORDER BY  "
                            + " 	DATE_FORMAT(SUA.DATE, \"%Y-01-01\") DESC  ",
            nativeQuery = true)
    Page<SpendingsListProjection> findSpendingsNumericalGroupByYear(
            @Param("userId") long userId,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            Pageable pageable);

    @Query(
            value =
                    " SELECT "
                            + " 	S.CATEGORY as category, "
                            + " 	SUM(S.AMOUNT) as total"
                            + " FROM  "
                            + " 	APP.SPENDING_USER_AGGR SUA, "
                            + " 	APP.SPENDING S "
                            + " WHERE  "
                            + " 		SUA.SPENDING_USER_AGGR_ID = S.SPENDING_USER_AGGR_ID  "
                            + " 	AND SUA.USER_ID = :userId "
                            + " 	AND SUA.DATE >= :startDate "
                            + " 	AND SUA.DATE <= :endDate "
                            + " GROUP BY  "
                            + " 	S.CATEGORY  "
                            + " ORDER BY  "
                            + " 	SUM(S.AMOUNT) DESC  ",
            countQuery =
                    " SELECT "
                            + " 	COUNT(*) "
                            + " FROM  "
                            + " 	APP.SPENDING_USER_AGGR SUA, "
                            + " 	APP.SPENDING S "
                            + " WHERE  "
                            + " 		SUA.SPENDING_USER_AGGR_ID = S.SPENDING_USER_AGGR_ID  "
                            + " 	AND SUA.USER_ID = :userId "
                            + " 	AND SUA.DATE >= :startDate "
                            + " 	AND SUA.DATE <= :endDate "
                            + " GROUP BY  "
                            + " 	S.CATEGORY  "
                            + " ORDER BY  "
                            + " 	SUM(S.AMOUNT) DESC  ",
            nativeQuery = true)
    Page<SpendingsListProjection> findSpendingsCategorical(
            @Param("userId") long userId,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            Pageable pageable);
}
