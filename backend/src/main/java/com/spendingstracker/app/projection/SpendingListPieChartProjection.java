package com.spendingstracker.app.projection;


import java.math.BigDecimal;

/**
 * Projection class for list query to render a pie chart
 *
 * @see SpendingListProjection
 */
public record SpendingListPieChartProjection(String category, BigDecimal total)
        implements SpendingListProjection {}
