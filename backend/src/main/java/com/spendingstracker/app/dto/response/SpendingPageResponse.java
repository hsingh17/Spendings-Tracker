package com.spendingstracker.app.dto.response;

import org.springframework.data.domain.Page;

/**
 * Object to store results for GET requests to get all of a user's spendings
 *
 * @see SpendingPageItem
 */
public record SpendingPageResponse(Page<? extends SpendingPageItem> spendingPage) {}
