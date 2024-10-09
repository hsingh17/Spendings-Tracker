package com.spendingstracker.app.mapper;

import com.spendingstracker.app.projection.SpendingListProjection;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.math.BigInteger;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;

/**
 * Implementation of <code>RowMapper</code> for <code>SpendingListProjection</code>
 *
 * @see SpendingListProjection
 */
@Component
public class SpendingListProjectionMapper implements RowMapper<SpendingListProjection> {
    @Override
    public SpendingListProjection mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new SpendingListProjection(
                tryExtractColumn(rs, "spendingUserAggrId", BigInteger.class),
                tryExtractColumn(rs, "category", String.class),
                tryExtractColumn(rs, "date", LocalDate.class),
                rs.getBigDecimal("total"));
    }

    private <T> T tryExtractColumn(ResultSet rs, String columnName, Class<T> tClass) {
        try {
            rs.findColumn(columnName);
            return rs.getObject(columnName, tClass);
        } catch (SQLException ignored) {
            return null;
        }
    }
}
