package com.spendingstracker.app.dto.response;

import com.spendingstracker.app.projection.SpendingListProjection;

import lombok.Getter;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDate;

/** Stores information about a spending for line charts */
@Getter
public class SpendingPageItemLineChart implements SpendingPageItem {
    private final BigInteger spendingUserAggrId;
    private final LocalDate date;
    private final BigDecimal total;

    public SpendingPageItemLineChart(SpendingListProjection spendingListProj) {
        this.spendingUserAggrId = spendingListProj.spendingUserAggrId();
        this.date = spendingListProj.date();
        this.total = spendingListProj.total();
    }
}
;
