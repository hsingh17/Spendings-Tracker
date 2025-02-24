package com.spendingstracker.app.projection;

import com.spendingstracker.app.entity.SpendingCategory;

import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Map;

/**
 * Projection class for list query to render a pie chart
 *
 * @see SpendingListProjection
 */
@Getter
public record SpendingListBarChartProjection(
        Map<LocalDate, Map<SpendingCategory, BigDecimal>> dateToCategoryTotal)
        implements SpendingListProjection {}
