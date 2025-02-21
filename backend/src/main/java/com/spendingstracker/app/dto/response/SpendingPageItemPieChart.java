package com.spendingstracker.app.dto.response;

import com.spendingstracker.app.projection.SpendingListProjection;

import lombok.Getter;

import java.math.BigDecimal;
import java.math.BigInteger;

/** Stores information about a particular spending day for pie charts */
@Getter
public class SpendingPageItemPieChart implements SpendingPageItem {
    private final BigInteger spendingUserAggrId;
    private final String category;
    private final BigDecimal total;

    public SpendingPageItemPieChart(SpendingListProjection spendingListProj) {
        this.spendingUserAggrId = spendingListProj.spendingUserAggrId();
        this.category = spendingListProj.category();
        this.total = spendingListProj.total();
    }
}
