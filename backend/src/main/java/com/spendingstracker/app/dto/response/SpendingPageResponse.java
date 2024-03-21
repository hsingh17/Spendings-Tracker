package com.spendingstracker.app.dto.response;

import lombok.Builder;
import lombok.Data;

import org.springframework.data.domain.Page;

/**
 * Object to store results for GET requests to get all of a user's spendings
 *
 * @see SpendingPageItem
 */
@Data
@Builder
public class SpendingPageResponse {
    private final Page<SpendingPageItem> spendingPageItems;
}
