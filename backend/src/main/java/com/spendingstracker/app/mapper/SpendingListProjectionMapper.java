package com.spendingstracker.app.mapper;

import com.spendingstracker.app.projection.SpendingListLineChartProjection;
import com.spendingstracker.app.projection.SpendingListProjection;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Implementation of <code>RowMapper</code> for <code>SpendingListLineChartProjectionr</code>
 *
 * @see SpendingListLineChartProjection
 */
public abstract class SpendingListProjectionMapper<T extends SpendingListProjection>
        implements RowMapper<T> {

    protected <S> S tryExtractColumn(ResultSet rs, String columnName, Class<S> sClass) {
        try {
            rs.findColumn(columnName);
            return rs.getObject(columnName, sClass);
        } catch (SQLException ignored) {
            return null;
        }
    }
}
