package com.spendingstracker.app.dto.response;

import com.spendingstracker.app.projection.SpendingListPieChartProjection;

import java.math.BigDecimal;

/** Stores information about a particular spending day for pie charts */
public record SpendingPageItemPieChart(String category, BigDecimal total)
        implements SpendingPageItem {

    public SpendingPageItemPieChart(SpendingListPieChartProjection spendingListProj) {
        this(spendingListProj.category(), spendingListProj.total());
    }
}
