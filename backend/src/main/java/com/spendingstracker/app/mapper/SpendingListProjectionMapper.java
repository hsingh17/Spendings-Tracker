package com.spendingstracker.app.mapper;

import com.spendingstracker.app.projection.SpendingListProjection;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.math.BigInteger;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;

@Component
public class SpendingListProjectionMapper implements RowMapper<SpendingListProjection> {
    @Override
    public SpendingListProjection mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new SpendingListProjection(
                rs.getObject("spendingUserAggrId", BigInteger.class),
                rs.getString("category"),
                rs.getObject("date", LocalDate.class),
                rs.getBigDecimal("total"));
    }
}
