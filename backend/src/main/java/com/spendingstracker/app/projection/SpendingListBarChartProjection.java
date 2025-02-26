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
    private final Map<LocalDate, Map<SpendingCategoryEnum, BigDecimal>> barMap;

    public SpendingListBarChartProjection() {
        this.barMap = new HashMap<>();
    }

    public void upsert(LocalDate date, SpendingCategoryEnum category, BigDecimal amount) {
        if (!barMap.containsKey(date)) {
            barMap.put(date, new HashMap<>());
        }

        Map<SpendingCategoryEnum, BigDecimal> categoryToAmountMap = barMap.get(date);
        categoryToAmountMap.merge(category, amount, BigDecimal::add);
    }
}
