package com.spendingstracker.app.controller.currency;

import static com.spendingstracker.app.dto.response.ApiResponse.okResponse;

import com.spendingstracker.app.dto.requests.UpdateCurrencyRequest;
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

    /**
     * @return all available currencies
     * @param indicateUserCurrency flag to determine if the user's selected currency should be
     *     indicated in response
     */
    @GetMapping("/currencies")
    public ResponseEntity<ApiResponse<CurrenciesListResponse>> getCurrencies(
            @RequestParam(value = "indicateUserCurrency", required = false, defaultValue = "false")
                    boolean indicateUserCurrency) {
        log.info("GET /currencies");
        CurrenciesListResponse currenciesListResponse =
                currencyService.getCurrencies(indicateUserCurrency);

        ApiResponse<CurrenciesListResponse> response =
                okResponse(currenciesListResponse, null, null);
        return ResponseEntity.ok(response);
    }

    /**
     * @return user's currently selected currency
     * @see CurrencyResponse
     */
    @GetMapping("/current-currency")
    public ResponseEntity<ApiResponse<CurrencyResponse>> getCurrency() {
        log.info("/current-currency");
        CurrencyResponse currencyResponse = currencyService.getUserCurrency();
        ApiResponse<CurrencyResponse> response = okResponse(currencyResponse, null, null);
        return ResponseEntity.ok(response);
    }

    /**
     * Route for updating a user's currency
     *
     * @param updateCurrencyRequest
     * @see UpdateCurrencyRequest
     */
    @PutMapping("/update-currency")
    public ResponseEntity<ApiResponse<Void>> updateUserCurrency(
            @RequestBody UpdateCurrencyRequest updateCurrencyRequest) {
        log.info("PUT /update-currency");
        currencyService.updateUserCurrency(updateCurrencyRequest);
        ApiResponse<Void> response =
                okResponse(null, null, "Updated currency to " + updateCurrencyRequest.currency());

        return ResponseEntity.ok(response);
    }
}
