package com.spendingstracker.app.projection;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDate;

/**
 * Projection record to store results from repository queries
 *
 * @see com.spendingstracker.app.repository.SpendingUserAggrRepository
 */
public record SpendingListProjection(
        BigInteger spendingUserAggrId, String category, LocalDate date, BigDecimal total) {}
