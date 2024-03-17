package com.spendingstracker.app.service;

import com.spendingstracker.app.constants.Granularity;
import com.spendingstracker.app.constants.GraphType;
import com.spendingstracker.app.dto.response.SpendingDetailsResponse;
import com.spendingstracker.app.entity.Spending;
import com.spendingstracker.app.projection.SpendingsListProjection;
import com.spendingstracker.app.response.ApiResponse;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

/** Service class for performing CRUD operations on spendings */
@Service
public interface SpendingService {
    /**
     * Get's all of a user's spendings that fit the criteria of the parameters passed in.
     *
     * @param userId primary key in <code>APP.USER</code>
     * @param startDate date from which to begin looking for spendings.
     * @param endDate date to end looking for spendings.
     * @param granularity the granularity to which the spendings should be grouped by
     * @param type the graph type being requested by the user.
     * @param page the page which user is looking for spendings on
     * @param limit the number of spendings to return
     * @return <code>{@literal Page<SpendingsListProjection>}</code> object that contains a page of
     *     <code>SpendingsListProjection</code>
     */
    Page<SpendingsListProjection> getSpendings(
            long userId,
            LocalDate startDate,
            LocalDate endDate,
            int page,
            int limit,
            Granularity granularity,
            GraphType type);

    /**
     * Get details for a spending on that date.
     *
     * @param spendingDate date of the spending for which the details are requested
     * @param userId       primary key in <code>APP.USER</code>
     * @return <code>{@literal SpendingDetailsResponse}</code> spendings for the user on that day
     * @see SpendingDetailsResponse
     */
    SpendingDetailsResponse getSpendingDetails(LocalDate spendingDate, long userId);

    /**
     * Create <code>spendings</code> for user with ID <code>userId</code> for date <code>
     * spendingDate</code>.
     *
     * @param spendings <code>{@literal Set<Spending>}</code> objects that user wants to create.
     * @param spendingDate the date for which the <code>spendings</code> should be created for.
     * @param userId primary key in <code>APP.USER</code>
     * @see ApiResponse
     */
    void createSpending(Set<Spending> spendings, LocalDate spendingDate, long userId);

    /**
     * Update <code>spendings</code> for user with ID <code>userId</code> for date <code>
     * spendingDate</code>.
     *
     * @param spendings spendings to update
     * @param spendingDate day for which spendings need to be updated for
     * @param userId primary key in <code>APP.USER</code>
     */
    void updateSpending(Set<Spending> spendings, LocalDate spendingDate, long userId);

    /**
     * Delete an entire spending day
     *
     * @param spendingUserAggrId the primary key for the <code>SPENDING_USER_AGGR</code> table that
     *     is associated to these spendings.
     */
    void deleteSpending(long spendingUserAggrId);
}
