package com.spendingstracker.app.dto.response;

import com.spendingstracker.app.projection.SpendingListLineChartProjection;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDate;

/** Stores information about a spending for line charts */
public record SpendingPageItemLineChart(
        BigInteger spendingUserAggrId, LocalDate date, BigDecimal total)
        implements SpendingPageItem {

    public SpendingPageItemLineChart(SpendingListLineChartProjection spendingListProj) {
        this(
                spendingListProj.spendingUserAggrId(),
                spendingListProj.date(),
                spendingListProj.total());
    }
}
;
