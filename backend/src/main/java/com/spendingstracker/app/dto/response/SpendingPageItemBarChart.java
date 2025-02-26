package com.spendingstracker.app.dto.response;

import com.spendingstracker.app.entity.SpendingCategory;
import com.spendingstracker.app.projection.SpendingListBarChartProjection;

import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Map;

/** Stores information about a particular spending day for bar charts */
@Getter
public class SpendingPageItemBarChart implements SpendingPageItem {
    private final Map<LocalDate, Map<SpendingCategory, BigDecimal>> barMap;

    public SpendingPageItemBarChart(SpendingListBarChartProjection spendingListBarChartProj) {
        this.barMap = spendingListBarChartProj.getBarMap();
    }
}
