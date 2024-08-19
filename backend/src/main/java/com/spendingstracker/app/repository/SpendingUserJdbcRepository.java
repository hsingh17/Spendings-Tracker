package com.spendingstracker.app.repository;

import com.spendingstracker.app.constants.Granularity;
import com.spendingstracker.app.mapper.SpendingListProjectionMapper;
import com.spendingstracker.app.projection.SpendingListProjection;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
@Slf4j
/**
 * JDBC Repository for running custom SQL loaded from the classpath
 *
 * @see SpendingUserAggrRepository
 * @see com.spendingstracker.app.config.ClassPathResourceLoaderConfig
 * @see SpendingListProjectionMapper
 */
public class SpendingUserJdbcRepository {
    private final NamedParameterJdbcTemplate jdbcTemplate;
    private final Map<String, String> sqlResourcesMap;
    private final SpendingListProjectionMapper rowMapper;

    public SpendingUserJdbcRepository(
            NamedParameterJdbcTemplate jdbcTemplate,
            @Qualifier("sqlResourcesMap") Map<String, String> sqlResourcesMap,
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
        SqlParameterSource params = buildParams(userId, startDate, endDate, granularity, pageable);

        return queryForSpendingListProjs(
                queryForSpendingsListProjsCount(
                        sqlResourcesMap.get("countSpendingsNumericalGroupBy"), params),
                sqlResourcesMap.get("findSpendingsNumericalGroupBy"),
                pageable,
                params);
    }

    public Page<SpendingListProjection> findSpendingsCategorical(
            BigInteger userId, LocalDate startDate, LocalDate endDate, Pageable pageable) {
        SqlParameterSource params = buildParams(userId, startDate, endDate, null, pageable);
        return queryForSpendingListProjs(
                queryForSpendingsListProjsCount(
                        sqlResourcesMap.get("countSpendingsCategorical"), params),
                sqlResourcesMap.get("findSpendingsCategorical"),
                pageable,
                params);
    }

    private Page<SpendingListProjection> queryForSpendingListProjs(
            int total, String sql, Pageable pageable, SqlParameterSource params) {
        log.debug("Running SQL: {}", sql);
        List<SpendingListProjection> projsList = jdbcTemplate.query(sql, params, rowMapper);
        return new PageImpl<>(projsList, pageable, total); // TODO
    }

    private SqlParameterSource buildParams(
            BigInteger userId,
            LocalDate startDate,
            LocalDate endDate,
            Granularity granularity,
            Pageable pageable) {
        return new MapSqlParameterSource()
                .addValue("userId", userId)
                .addValue("startDate", startDate)
                .addValue("endDate", endDate)
                .addValue("granularity", granularity)
                .addValue("limit", pageable.getPageSize())
                .addValue("offset", pageable.getPageNumber() * pageable.getPageSize());
    }

    private int queryForSpendingsListProjsCount(String sql, SqlParameterSource params) {
        return Optional.ofNullable(jdbcTemplate.queryForObject(sql, params, Integer.class))
                .orElse(0);
    }
}
