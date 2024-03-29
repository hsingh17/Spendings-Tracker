package com.spendingstracker.app.projection;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDate;

/**
 * Projection interface to store results from repository queries
 *
 * @see com.spendingstracker.app.repository.SpendingUserAggrRepository
 */
public interface SpendingListProjection {
    BigInteger getSpendingUserAggrId();

    String getCategory();

    LocalDate getDate();

    BigDecimal getTotal();
}
