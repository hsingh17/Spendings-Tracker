package com.spendingstracker.app.dto.response;

import com.spendingstracker.app.constants.SpendingCategoryEnum;
import com.spendingstracker.app.projection.SpendingListBarChartProjection;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Map;

/** Stores information about a particular spending day for bar charts */
public record SpendingPageItemBarChart(
        LocalDate date, BigDecimal total, Map<SpendingCategoryEnum, BigDecimal> categoryTotalMap)
        implements SpendingPageItem {
    public SpendingPageItemBarChart(SpendingListBarChartProjection spendingListBarChartProj) {
        this(
                spendingListBarChartProj.getDate(),
                spendingListBarChartProj.getTotal(),
                spendingListBarChartProj.getCategoryTotalMap());
    }
}
