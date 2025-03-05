package com.spendingstracker.app.mapper;

import com.spendingstracker.app.projection.SpendingListLineChartProjection;
import com.spendingstracker.app.projection.SpendingListProjection;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 * Implementation of <code>RowMapper</code> for <code>SpendingListLineChartProjectionr</code>
 *
 * @see SpendingListLineChartProjection
 */
public abstract class SpendingListProjectionMapper<T extends SpendingListProjection>
        implements RowMapper<T> {

    /** Attempts to extract column from the result set. Returns null if unable to. */
    protected <S> S tryExtractColumn(ResultSet rs, String columnName, Class<S> sClass) {
        try {
            rs.findColumn(columnName);
            return rs.getObject(columnName, sClass);
        } catch (SQLException ignored) {
            return null;
        }
    }

    /**
     * Maps a concatenated string (e.g <code>"1,2,3"</code>) to a list of Java objects (e.g: <code>
     * [1,2,3]</code>)
     */
    protected <S> List<S> mapConcatStringToObjList(
            ResultSet rs, String columnName, ConcatStringObjMapperFunc<S> mapperFunc)
            throws SQLException {
        String concatStr = rs.getString(columnName);
        List<String> strList = List.of(concatStr.split(","));
        List<S> ret = new ArrayList<>();

        for (String str : strList) {
            ret.add(mapperFunc.map(str));
        }

        return ret;
    }

    /** Used in <code>mapConcatStringToObjList</code> to map each string value to a Java object */
    @FunctionalInterface
    protected interface ConcatStringObjMapperFunc<T> {
        T map(String val);
    }
}
