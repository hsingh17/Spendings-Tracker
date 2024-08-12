package com.spendingstracker.app.dto.requests;

import com.spendingstracker.app.constants.Constants;
import com.spendingstracker.app.constants.Granularity;
import com.spendingstracker.app.constants.GraphType;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

import lombok.Data;

import java.time.LocalDate;

/**
 * DTO to store filters for the GET /spendings route. Class fields:
 *
 * <ul>
 *   <li><code>startDate</code> date from which to begin looking for spendings
 *   <li><code>endDate</code> date to end looking for spendings
 *   <li><code>granularity</code> the granularity to which the spendings should be grouped by
 *   <li><code>graphType</code> the graph type being requested by the user
 *   <li><code>page</code> the page which user is looking for spendings on <code>limit</code> the
 *       number of spendings to return
 * </ul>
 *
 * @see com.spendingstracker.app.controller.spending.SpendingsController
 * @see Granularity
 * @see GraphType
 */
@Data
public class GetSpendingsRequestFilters {
    private final LocalDate startDate = Constants.LOW_DATE;

    private final LocalDate endDate = Constants.HIGH_DATE;

    private final Granularity granularity = Granularity.DAY;

    private final GraphType graphType = GraphType.LINE;

    @Min(0)
    private final int page = 1;

    @Min(1)
    @Max(500)
    private final int limit = 25;

    @Override
    public String toString() {
        return "?start-date="
                + startDate
                + "&end-date="
                + endDate
                + "&group-by="
                + granularity.getCode()
                + "&graph-type="
                + graphType.getCode()
                + "&page="
                + page
                + "&limit="
                + limit;
    }
}
