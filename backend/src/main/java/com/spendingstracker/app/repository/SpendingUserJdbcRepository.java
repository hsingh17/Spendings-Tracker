package com.spendingstracker.app.repository;

import com.spendingstracker.app.constants.Granularity;
import com.spendingstracker.app.mapper.SpendingListProjectionMapper;
import com.spendingstracker.app.projection.SpendingListProjection;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Repository
public class SpendingUserJdbcRepository {
    private final NamedParameterJdbcTemplate jdbcTemplate;
    private final Map<String, String> sqlResourcesMap;
    private final SpendingListProjectionMapper rowMapper;

    public SpendingUserJdbcRepository(
            NamedParameterJdbcTemplate jdbcTemplate,
            Map<String, String> sqlResourcesMap,
            SpendingListProjectionMapper rowMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.sqlResourcesMap = sqlResourcesMap;
        this.rowMapper = rowMapper;
    }

    public Page<SpendingListProjection> findSpendingsNumericalGroupBy(
            BigInteger userId,
            LocalDate startDate,
            LocalDate endDate,
            Granularity granularity,
            Pageable pageable) {
        return queryForSpendingListProjs(
                sqlResourcesMap.get("findSpendingsNumericalGroupBy"),
                userId,
                startDate,
                endDate,
                granularity,
                pageable);
    }

    public Page<SpendingListProjection> findSpendingsCategorical(
            BigInteger userId, LocalDate startDate, LocalDate endDate, Pageable pageable) {
        return queryForSpendingListProjs(
                sqlResourcesMap.get("findSpendingsCategorical"),
                userId,
                startDate,
                endDate,
                null,
                pageable);
    }

    private Page<SpendingListProjection> queryForSpendingListProjs(
            String sql,
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

        List<SpendingListProjection> projsList = jdbcTemplate.query(sql, params, rowMapper);
        return new PageImpl<>(projsList, pageable, null); // TODO
    }
}
