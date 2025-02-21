package com.spendingstracker.app.dto.response;

import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Map;

/** Stores information about a particular spending day for bar charts */
@Getter
public class SpendingPageItemBarChart implements SpendingPageItem {
    private final Map<LocalDate, Map<String, BigDecimal>> barMap;

    // TODO
    public SpendingPageItemBarChart(Map<LocalDate, Map<String, BigDecimal>> barMap) {
        this.barMap = barMap;
    }
}
