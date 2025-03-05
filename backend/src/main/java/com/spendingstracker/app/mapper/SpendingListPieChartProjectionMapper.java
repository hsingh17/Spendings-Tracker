package com.spendingstracker.app.mapper;

import com.spendingstracker.app.projection.SpendingListPieChartProjection;

import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Implementation of <code>SpendingListProjectMapper</code> for <code>SpendingListProjection</code>
 *
 * @see SpendingListPieChartProjection
 * @see SpendingListProjectionMapper
 */
@Component
public class SpendingListPieChartProjectionMapper
        extends SpendingListProjectionMapper<SpendingListPieChartProjection> {
    @Override
    public SpendingListPieChartProjection mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new SpendingListPieChartProjection(
                super.tryExtractColumn(rs, "category", String.class), rs.getBigDecimal("total"));
    }
}
