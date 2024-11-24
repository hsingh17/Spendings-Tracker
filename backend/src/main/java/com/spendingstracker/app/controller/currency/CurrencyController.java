package com.spendingstracker.app.controller.currency;

import com.spendingstracker.app.dto.response.*;
import com.spendingstracker.app.service.currency.CurrencyService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/** Controller class containing the routes for performing CRUD operations on a currencies. */
@RestController
@RequestMapping("/v1/currency")
@Slf4j
@RequiredArgsConstructor
public class CurrencyController {
    private final CurrencyService currencyService;

    @GetMapping("/currencies")
    public ResponseEntity<ApiResponse<CurrenciesListResponse>> getCurrencies() {
        log.info("GET /currencies");
        CurrenciesListResponse currenciesListResponse = currencyService.getCurrencies();
        ApiResponse<CurrenciesListResponse> response =
                ApiResponse.buildOkApiResponse(currenciesListResponse, null, null);
        return ResponseEntity.ok(response);
    }
}
