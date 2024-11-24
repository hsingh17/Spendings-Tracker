package com.spendingstracker.app.dto.response;

import java.util.List;

/**
 * Response for <code>GET /currencies</code>
 *
 * @param currencies
 * @see com.spendingstracker.app.controller.currency.CurrencyController
 * @see CurrencyResponse
 */
public record CurrenciesListResponse(List<CurrencyResponse> currencies) {}
