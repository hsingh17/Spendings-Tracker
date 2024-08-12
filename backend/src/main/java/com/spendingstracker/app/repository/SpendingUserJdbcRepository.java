package com.spendingstracker.app.repository;

import com.spendingstracker.app.constants.Granularity;
import com.spendingstracker.app.projection.SpendingListProjection;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.List;
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
        SqlParameterSource params =
                new MapSqlParameterSource()
                        .addValue("userId", userId)
                        .addValue("startDate", startDate)
                        .addValue("endDate", endDate)
                        .addValue("granularity", granularity)
                        .addValue("limit", pageable.getPageSize())
                        .addValue(
                                "offset", (pageable.getPageNumber() - 1) * pageable.getPageSize());

        List<SpendingListProjection> proj =
                jdbcTemplate.query(
                        sqlResourcesMap.get("findSpendingsNumericalGroupBy"), params, rs -> {});

        return null;
    }

    public Page<SpendingListProjection> findSpendingsCategorical(
            BigInteger userId, LocalDate startDate, LocalDate endDate, Pageable pageable) {
        SqlParameterSource params =
                new MapSqlParameterSource()
                        .addValue("userId", userId)
                        .addValue("startDate", startDate)
                        .addValue("endDate", endDate)
                        .addValue("limit", pageable.getPageSize())
                        .addValue(
                                "offset", (pageable.getPageNumber() - 1) * pageable.getPageSize());
        List<SpendingListProjection> proj =
                jdbcTemplate.query(
                        sqlResourcesMap.get("findSpendingsCategorical"), params, rs -> {});

        return null;
    }
}
