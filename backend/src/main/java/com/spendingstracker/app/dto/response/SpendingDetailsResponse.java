package com.spendingstracker.app.dto.response;

import java.util.List;

/**
 * Object containing the spendings for a particular day
 *
 * @see SpendingResponse
 */
public record SpendingDetailsResponse(List<SpendingResponse> spendings) {}
