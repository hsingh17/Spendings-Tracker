package com.spendingstracker.app.service.spending;

import com.spendingstracker.app.constants.Granularity;
import com.spendingstracker.app.constants.GraphType;
import com.spendingstracker.app.dto.requests.SpendingsSaveRequest;
import com.spendingstracker.app.dto.response.SpendingDetailsResponse;
import com.spendingstracker.app.dto.response.SpendingPageResponse;

import java.math.BigInteger;
import java.time.LocalDate;

/** Service class for performing CRUD operations on spendings */
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
    SpendingPageResponse getSpendings(
            BigInteger userId,
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
     * @param userId primary key in <code>APP.USER</code>
     * @return <code>{@literal SpendingDetailsResponse}</code> spendings for the user on that day
     * @see SpendingDetailsResponse
     */
    SpendingDetailsResponse getSpendingDetails(LocalDate spendingDate, BigInteger userId);

    /**
     * Create <code>spendings</code> for user with ID <code>userId</code> for date <code>
     * spendingDate</code>.
     *
     * @param spendingsSaveRequest <code>{@literal SpendingsSaveRequest}</code> objects that user
     *     wants to create.
     * @param spendingDate the date for which the <code>spendings</code> should be created for.
     * @param userId primary key in <code>APP.USER</code>
     * @see SpendingsSaveRequest
     */
    void createSpending(
            SpendingsSaveRequest spendingsSaveRequest, LocalDate spendingDate, BigInteger userId);

    /**
     * Update <code>spendings</code> for user with ID <code>userId</code> for date <code>
     * spendingDate</code>.
     *
     * @param spendingsSaveRequest <code>{@literal SpendingsSaveRequest}</code> objects that user
     *     wants to create.
     * @param spendingDate day for which spendings need to be updated for
     * @param userId primary key in <code>APP.USER</code>
     * @see SpendingsSaveRequest
     */
    void updateSpending(
            SpendingsSaveRequest spendingsSaveRequest, LocalDate spendingDate, BigInteger userId);

    /**
     * Delete an entire spending day
     *
     * @param spendingUserAggrId the primary key for the <code>SPENDING_USER_AGGR</code> table that
     *     is associated to these spendings.
     */
    void deleteSpending(BigInteger spendingUserAggrId);
}
