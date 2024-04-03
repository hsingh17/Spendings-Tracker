package com.spendingstracker.app.dto.response;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDate;

/** Stores information about a particular spending day */
@Data
@Builder
public class SpendingPageItem {
    private final BigInteger spendingUserAggrId;
    private final String category;
    private final LocalDate date;
    private final BigDecimal total;
}
