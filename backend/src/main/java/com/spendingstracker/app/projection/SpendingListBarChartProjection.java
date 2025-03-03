package com.spendingstracker.app.projection;

import com.spendingstracker.app.constants.SpendingCategoryEnum;

import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

/**
 * Projection class for list query to render a pie chart
 *
 * @see SpendingListProjection
 */
@Getter
public final class SpendingListBarChartProjection implements SpendingListProjection {
    private final LocalDate date;
    private final Map<SpendingCategoryEnum, BigDecimal> categoryTotalMap;
    private BigDecimal total;

    public SpendingListBarChartProjection(LocalDate date) {
        this.date = date;
        this.total = BigDecimal.ZERO;
        this.categoryTotalMap = new HashMap<>();
    }

    public void upsert(SpendingCategoryEnum category, BigDecimal amount) {
        categoryTotalMap.merge(category, amount, BigDecimal::add);
        total = total.add(amount);
    }
}
