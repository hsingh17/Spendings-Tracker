package com.spendingstracker.app.dto.requests;

import java.util.Set;

/**
 * Record object for requests to perform CRUD operations on spendings.
 *
 * @param spendingRequests <code>{@literal List<SpendingRequest>}</code> containing info about which
 *     spendings should be created, updated, or deleted.
 * @see SpendingRequest
 */
public record SpendingsSaveRequest(Set<SpendingRequest> spendingRequests) {}
