package com.spendingstracker.app.dto.requests;

import com.spendingstracker.app.constants.Constants;
import com.spendingstracker.app.constants.Granularity;
import com.spendingstracker.app.constants.GraphType;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

import lombok.AllArgsConstructor;
import lombok.Setter;

import org.springframework.web.bind.annotation.BindParam;

import java.time.LocalDate;
import java.util.Optional;

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
@Setter
@AllArgsConstructor
public class GetSpendingsRequestFilters {
    @BindParam("start-date")
    private final LocalDate startDate;

    @BindParam("end-date")
    private final LocalDate endDate;

    private final Granularity granularity;

    @BindParam("graph-type")
    private final GraphType graphType;

    @Min(0)
    private final Integer page;

    @Min(1)
    @Max(500)
    private final Integer limit;

    public LocalDate getStartDate() {
        return Optional.ofNullable(startDate).orElse(Constants.LOW_DATE);
    }

    public LocalDate getEndDate() {
        return Optional.ofNullable(endDate).orElse(Constants.HIGH_DATE);
    }

    public Granularity getGranularity() {
        return Optional.ofNullable(granularity).orElse(Granularity.DAY);
    }

    public GraphType getGraphType() {
        return Optional.ofNullable(graphType).orElse(GraphType.LINE);
    }

    public int getPage() {
        return Optional.ofNullable(page).orElse(0);
    }

    public int getLimit() {
        return Optional.ofNullable(limit).orElse(25);
    }

    @Override
    public String toString() {
        return "?start-date="
                + getStartDate()
                + "&end-date="
                + getEndDate()
                + "&group-by="
                + getGranularity().getCode()
                + "&graph-type="
                + getGraphType().getCode()
                + "&page="
                + getPage()
                + "&limit="
                + getLimit();
    }
}
