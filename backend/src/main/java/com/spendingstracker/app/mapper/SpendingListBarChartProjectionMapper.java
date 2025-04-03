package com.spendingstracker.app.mapper;

import com.spendingstracker.app.constants.SpendingCategoryEnum;
import com.spendingstracker.app.exception.FailedToMapRowException;
import com.spendingstracker.app.projection.SpendingListBarChartProjection;

import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;

/**
 * Implementation of <code>SpendingListProjectMapper</code> for <code>SpendingListProjection</code>
 *
 * @see SpendingListBarChartProjection
 * @see SpendingListProjectionMapper
 */
@Component
@Slf4j
public class SpendingListBarChartProjectionMapper
        extends SpendingListProjectionMapper<SpendingListBarChartProjection> {
    @Override
    public SpendingListBarChartProjection mapRow(ResultSet rs, int rowNum) throws SQLException {
        LocalDate date = rs.getObject("date", LocalDate.class);
        SpendingListBarChartProjection barChartProj = new SpendingListBarChartProjection(date);

        List<SpendingCategoryEnum> categories =
                super.mapConcatStringToObjList(rs, "categories", SpendingCategoryEnum::fromCode);
        List<BigDecimal> amounts = super.mapConcatStringToObjList(rs, "amounts", BigDecimal::new);

        if (categories.size() != amounts.size()) {
            log.debug("# Categories: {} | # Amounts: {}", categories.size(), amounts.size());
            throw new FailedToMapRowException(
                    "The number of categories does not match the number of amounts");
        }

        for (int i = 0; i < categories.size(); i++) {
            SpendingCategoryEnum category = categories.get(i);
            BigDecimal amount = amounts.get(i);

            barChartProj.upsert(category, amount);
        }

        return barChartProj;
    }
}
