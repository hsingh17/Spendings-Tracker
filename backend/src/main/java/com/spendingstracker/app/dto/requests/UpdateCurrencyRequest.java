package com.spendingstracker.app.dto.requests;

import com.spendingstracker.app.constants.CurrencyEnum;

/** Request object for when a user wants update their display currency */
public record UpdateCurrencyRequest(CurrencyEnum currency) {}
