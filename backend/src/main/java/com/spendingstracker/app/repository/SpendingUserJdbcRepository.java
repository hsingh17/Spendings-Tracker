package com.spendingstracker.app.repository;

import com.spendingstracker.app.constants.Granularity;
import com.spendingstracker.app.projection.SpendingListProjection;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.Map;

@Repository
public class SpendingUserJdbcRepository {
    private final NamedParameterJdbcTemplate jdbcTemplate;
    private final Map<String, String> sqlResourcesMap;

    public SpendingUserJdbcRepository(
            NamedParameterJdbcTemplate jdbcTemplate, Map<String, String> sqlResourcesMap) {
        this.jdbcTemplate = jdbcTemplate;
        this.sqlResourcesMap = sqlResourcesMap;
    }

    public Page<SpendingListProjection> findSpendingsNumericalGroupBy(
            BigInteger userId,
            LocalDate startDate,
            LocalDate endDate,
            Granularity granularity,
            Pageable pageable) {
        return null;
    }

    public Page<SpendingListProjection> findSpendingsCategorical(
            BigInteger userId, LocalDate startDate, LocalDate endDate, Pageable pageable) {
        return null;
    }
}
