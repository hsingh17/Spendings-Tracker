package com.spendingstracker.app.mapper;

import com.spendingstracker.app.projection.SpendingListLineChartProjection;

import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.sql.ResultSet;
import java.time.LocalDate;

/**
 * Implementation of <code>RowMapper</code> for <code>SpendingListLineChartProjectionr</code>
 *
 * @see com.spendingstracker.app.projection.SpendingListLineChartProjection
 * @see SpendingListProjectionMapper
 */
@Component
public class SpendingListLineChartProjectionMapper
        extends SpendingListProjectionMapper<SpendingListLineChartProjection> {
    @Override
    public SpendingListLineChartProjection mapRow(ResultSet rs, int rowNum) {
        return new SpendingListLineChartProjection(
                super.tryExtractColumn(rs, "spendingUserAggrId", BigInteger.class),
                super.tryExtractColumn(rs, "date", LocalDate.class),
                super.tryExtractColumn(rs, "total", BigDecimal.class));
    }
}
