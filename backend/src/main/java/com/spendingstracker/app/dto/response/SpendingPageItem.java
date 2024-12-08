package com.spendingstracker.app.dto.response;

import com.spendingstracker.app.projection.SpendingListProjection;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDate;

/** Stores information about a particular spending day */
public record SpendingPageItem(
        BigInteger spendingUserAggrId, String category, LocalDate date, BigDecimal total) {

    public SpendingPageItem(SpendingListProjection spendingListProj) {
        this(
                spendingListProj.spendingUserAggrId(),
                spendingListProj.category(),
                spendingListProj.date(),
                spendingListProj.total());
    }
}
;
