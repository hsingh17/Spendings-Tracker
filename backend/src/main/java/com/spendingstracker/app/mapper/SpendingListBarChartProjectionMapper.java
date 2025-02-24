package com.spendingstracker.app.mapper;

import com.spendingstracker.app.projection.SpendingListBarChartProjection;

import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Implementation of <code>SpendingListProjectMapper</code> for <code>SpendingListProjection</code>
 *
 * @see SpendingListBarChartProjection
 * @see SpendingListProjectionMapper
 */
@Component
public class SpendingListBarChartProjectionMapper
        extends SpendingListProjectionMapper<SpendingListBarChartProjection> {
    @Override
    public SpendingListBarChartProjection mapRow(ResultSet rs, int rowNum) throws SQLException {
        return null; // TODO
    }
}
