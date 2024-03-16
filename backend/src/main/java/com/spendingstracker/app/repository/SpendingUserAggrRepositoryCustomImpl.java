package com.spendingstracker.app.repository;

import com.spendingstracker.app.projection.SpendingsListProjection;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public class SpendingUserAggrRepositoryCustomImpl implements SpendingUserAggrRepositoryCustom {
    private static final String baseQuery =
            """
                    SELECT
                        MAX(SUA.SPENDING_USER_AGGR_ID) AS spendingUserAggrId,
                        :dateFormat AS date,
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
                        :dateFormat
                    ORDER BY
                        DATE_FORMAT(SUA.DATE, "%Y-01-01") DESC
            """;

    @PersistenceContext private final EntityManager entityManager;

    public SpendingUserAggrRepositoryCustomImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public Page<SpendingsListProjection> findSpendingsNumericalGroupBy(
            long userId, LocalDate startDate, LocalDate endDate, Pageable pageable) {
        return null;
    }
}
