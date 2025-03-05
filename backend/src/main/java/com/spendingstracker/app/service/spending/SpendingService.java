package com.spendingstracker.app.service.spending;

import com.spendingstracker.app.dto.requests.GetSpendingsRequestFilters;
import com.spendingstracker.app.dto.requests.SpendingsSaveRequest;
import com.spendingstracker.app.dto.response.SpendingDetailsResponse;
import com.spendingstracker.app.dto.response.SpendingPageResponse;

import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;
import java.time.LocalDate;

/** Service class for performing CRUD operations on spendings */
@Transactional
public interface SpendingService {
    /**
     * Get's all of a user's spendings that fit the criteria of the parameters passed in.
     *
     * @param filters object that stores all necessary filters for the request
     * @return <code>{@literal Page<SpendingsListProjection>}</code> object that contains a page of
     *     <code>SpendingsListProjection</code>
     * @see GetSpendingsRequestFilters
     */
    @Transactional(readOnly = true)
    SpendingPageResponse getSpendings(GetSpendingsRequestFilters filters);

    /**
     * Get details for a spending on that date.
     *
     * @param spendingDate date of the spending for which the details are requested
     * @return <code>{@literal SpendingDetailsResponse}</code> spendings for the user on that day
     * @see SpendingDetailsResponse
     */
    @Transactional(readOnly = true)
    SpendingDetailsResponse getSpendingDetails(LocalDate spendingDate);

    /**
     * Create <code>spendings</code> for user with ID <code>userId</code> for date <code>
     * spendingDate</code>.
     *
     * @param spendingsSaveRequest <code>{@literal SpendingsSaveRequest}</code> objects that user
     *     wants to create.
     * @param spendingDate the date for which the <code>spendings</code> should be created for.
     * @see SpendingsSaveRequest
     */
    void createSpending(SpendingsSaveRequest spendingsSaveRequest, LocalDate spendingDate);

    /**
     * Update <code>spendings</code> for user with ID <code>userId</code> for date <code>
     * spendingDate</code>.
     *
     * @param spendingsSaveRequest <code>{@literal SpendingsSaveRequest}</code> objects that user
     *     wants to create.
     * @param spendingDate day for which spendings need to be updated for
     * @see SpendingsSaveRequest
     */
    void updateSpending(SpendingsSaveRequest spendingsSaveRequest, LocalDate spendingDate);

    /**
     * Delete an entire spending day
     *
     * @param spendingUserAggrId the primary key for the <code>SPENDING_USER_AGGR</code> table that
     *     is associated to these spendings.
     */
    void deleteSpending(BigInteger spendingUserAggrId);
}
