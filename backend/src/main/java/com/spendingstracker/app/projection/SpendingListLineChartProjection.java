package com.spendingstracker.app.projection;

import lombok.Getter;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDate;

/**
 * Projection class for list query to render a line chart
 *
 * @see com.spendingstracker.app.projection.SpendingListProjection
 */
public record SpendingListLineChartProjection(
        BigInteger spendingUserAggrId, LocalDate date, BigDecimal total)
        implements SpendingListProjection {}
