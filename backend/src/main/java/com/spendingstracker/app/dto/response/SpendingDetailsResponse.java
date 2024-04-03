package com.spendingstracker.app.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

/**
 * Object containing the spendings for a particular day
 *
 * @see SpendingResponse
 */
@Builder
@Data
public class SpendingDetailsResponse {
    private final List<SpendingResponse> spendings;
}
