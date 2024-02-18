package com.spendingstracker.app.controller;

import com.spendingstracker.app.constants.GraphType;
import com.spendingstracker.app.constants.Granularity;
import com.spendingstracker.app.dto.CustomUserDetails;
import com.spendingstracker.app.entity.Spending;
import com.spendingstracker.app.projection.SpendingsListProjection;
import com.spendingstracker.app.response.ApiLinks;
import com.spendingstracker.app.response.ApiMetadata;
import com.spendingstracker.app.response.ApiResponse;
import com.spendingstracker.app.service.SpendingService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.constraints.Min;

import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/v1/api")
@Slf4j
public class RestApiController {
    private final SpendingService spendingService;

    public RestApiController(SpendingService spendingService) {
        this.spendingService = spendingService;
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserDetails>> getMe() {
        log.info("GET /me");

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
        ApiResponse<UserDetails> apiResponse =
                new ApiResponse.ApiResponseBuilder<UserDetails>()
                        .setHttpStatus(HttpStatus.OK.value())
                        .setData(userDetails)
                        .setOk(true)
                        .build();
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/spendings")
    public ResponseEntity<ApiResponse<List<SpendingsListProjection>>> getSpendings(
            @RequestParam(name = "start-date", defaultValue = "1000-01-01") Date startDate,
            @RequestParam(name = "end-date", defaultValue = "9999-12-31") Date endDate,
            @RequestParam(name = "granularity", defaultValue = "Day") Granularity granularity,
            @RequestParam(name = "graph-type", defaultValue = "Line") GraphType graphType,
            @RequestParam(name = "page", defaultValue = "0") @Min(0) Integer page,
            @RequestParam(name = "limit", defaultValue = "25") @Min(1) Integer limit,
            HttpServletRequest request)
            throws IllegalArgumentException {
        log.info(
                "GET /spendings?start-date={}&end-date={}&group-by={}&graph-type={}&page={}&limit={}",
                startDate,
                endDate,
                granularity.getCode(),
                graphType.getCode(),
                page,
                limit);

        Page<SpendingsListProjection> spendingsPage =
                spendingService.getSpendings(
                        getUserId(), startDate, endDate, page, limit, granularity, graphType);

        ApiLinks apiLinks =
                new ApiLinks.ApiLinksBuilder(
                                request.getRequestURI(),
                                request.getQueryString(),
                                page,
                                spendingsPage.getTotalPages() - 1)
                        .build();

        ApiMetadata apiMetadata =
                new ApiMetadata.ApiMetadataBuilder()
                        .setCurrentPage(page)
                        .setLinks(apiLinks)
                        .setTotalPages(spendingsPage.getTotalPages())
                        .setPageSize(
                                spendingsPage
                                        .getNumberOfElements()) // How many elements were returned
                        // in this page
                        .setTotalCount(spendingsPage.getTotalElements())
                        .build();

        ApiResponse<List<SpendingsListProjection>> apiResponse =
                new ApiResponse.ApiResponseBuilder<List<SpendingsListProjection>>()
                        .setHttpStatus(HttpStatus.OK.value())
                        .setOk(true)
                        .setMetadata(apiMetadata)
                        .setData(spendingsPage.getContent())
                        .build();

        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/spendings/{spending-date}")
    public ResponseEntity<ApiResponse<List<Spending>>> getSpendingDetails(
            @PathVariable("spending-date") Date spendingDate) {
        log.info("GET /spendings/" + spendingDate);

        List<Spending> spendings = spendingService.getSpendingDetails(spendingDate, getUserId());
        ApiResponse<List<Spending>> apiResponse =
                new ApiResponse.ApiResponseBuilder<List<Spending>>()
                        .setHttpStatus(HttpStatus.OK.value())
                        .setOk(true)
                        .setData(spendings)
                        .build();

        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping("/spendings/{spending-date}")
    public ResponseEntity<ApiResponse> createSpending(
            @RequestBody Set<Spending> spendings,
            @PathVariable("spending-date") Date spendingDate) {
        log.info("POST /spendings/" + spendingDate);

        spendingService.createSpending(spendings, spendingDate, getUserId());
        ApiResponse apiResponse =
                new ApiResponse.ApiResponseBuilder()
                        .setHttpStatus(HttpStatus.OK.value())
                        .setMessage("Success")
                        .setOk(true)
                        .build();

        return ResponseEntity.ok(apiResponse);
    }

    @PutMapping("/spendings/{spending-date}")
    public ResponseEntity<ApiResponse> updateSpending(
            @RequestBody Set<Spending> spendings,
            @PathVariable("spending-date") Date spendingDate) {
        log.info("PUT /spendings/" + spendingDate);

        spendingService.updateSpending(spendings, spendingDate, getUserId());
        ApiResponse<List<Spending>> apiResponse =
                new ApiResponse.ApiResponseBuilder<List<Spending>>()
                        .setHttpStatus(HttpStatus.OK.value())
                        .setOk(true)
                        .setMessage("Updated spending for spending date: " + spendingDate)
                        .build();

        return ResponseEntity.ok(apiResponse);
    }

    @DeleteMapping("/spendings/{spending-user-aggr-id}")
    public ResponseEntity<ApiResponse> deleteSpending(
            @PathVariable("spending-user-aggr-id") long spendingUserAggrId) {
        log.info("DELETE /spendings/" + spendingUserAggrId);

        spendingService.deleteSpending(spendingUserAggrId);
        ApiResponse<List<Spending>> apiResponse =
                new ApiResponse.ApiResponseBuilder<List<Spending>>()
                        .setHttpStatus(HttpStatus.OK.value())
                        .setOk(true)
                        .setMessage("Delete spending for id: " + spendingUserAggrId)
                        .build();

        return ResponseEntity.ok(apiResponse);
    }

    private long getUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
        return userDetails.getUserId();
    }
}
