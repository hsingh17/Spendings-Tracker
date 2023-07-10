package com.spendingstracker.app.controller;

import com.spendingstracker.app.constants.Constants;
import com.spendingstracker.app.entity.CustomUserDetails;
import com.spendingstracker.app.entity.Spending;
import com.spendingstracker.app.projection.SpendingsListProjection;
import com.spendingstracker.app.response.ApiLinks;
import com.spendingstracker.app.response.ApiMetadata;
import com.spendingstracker.app.response.ApiResponse;
import com.spendingstracker.app.service.SpendingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/v1/api")
public class ApiRestController {
    @Autowired
    private SpendingService spendingService;

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserDetails>> getMe() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
        ApiResponse<UserDetails> apiResponse = new ApiResponse.ApiResponseBuilder<UserDetails>()
                .setHttpStatus(HttpStatus.OK)
                .setData(userDetails)
                .setOk(true)
                .build();
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/spendings")
    public ResponseEntity<ApiResponse<List<SpendingsListProjection>>> getSpendings(
            @RequestParam(name = "start-date", defaultValue = "1000-01-01") @DateTimeFormat(pattern = Constants.DATE_FORMAT) Date startDate,
            @RequestParam(name = "end-date", defaultValue = "9999-12-31") @DateTimeFormat(pattern = Constants.DATE_FORMAT) Date endDate,
            @RequestParam(name = "group-by", defaultValue = "D") String groupBy,
            @RequestParam(name = "type", defaultValue = "N") String type,
            @RequestParam(name = "page", defaultValue = "0") Integer page,
            @RequestParam(name = "limit", defaultValue = "25") Integer limit,
            HttpServletRequest request)
    throws IllegalArgumentException {
        validateListQueryParams(groupBy, type, page, limit);

        Page<SpendingsListProjection> spendingsPage = spendingService.getSpendings(getUserId(), startDate, endDate, page, limit, groupBy, type);
        ApiLinks apiLinks = new ApiLinks.ApiLinksBuilder(request.getRequestURI(), request.getQueryString(), page, spendingsPage.getTotalPages()-1).build();

        ApiMetadata apiMetadata = new ApiMetadata.ApiMetadataBuilder()
                .setCurrentPage(page)
                .setLinks(apiLinks)
                .setTotalPages(spendingsPage.getTotalPages()-1) // 0-indexed
                .setPageSize(spendingsPage.getSize()) // How many elements were returned in this page
                .setTotalCount(spendingsPage.getTotalElements())
                .build();

        ApiResponse<List<SpendingsListProjection>> apiResponse = new ApiResponse.ApiResponseBuilder<List<SpendingsListProjection>>()
                .setHttpStatus(HttpStatus.OK)
                .setOk(true)
                .setMetadata(apiMetadata)
                .setData(spendingsPage.getContent())
                .build();

        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/spendings/{spending-date}")
    public ResponseEntity<ApiResponse<List<Spending>>> getSpendingDetails(
            @PathVariable("spending-date") @DateTimeFormat(pattern = Constants.DATE_FORMAT) Date spendingDate) {
        List<Spending> spendings = spendingService.getSpendingDetails(spendingDate, getUserId());
        ApiResponse<List<Spending>> apiResponse = new ApiResponse.ApiResponseBuilder<List<Spending>>()
                .setHttpStatus(HttpStatus.OK)
                .setOk(true)
                .setData(spendings)
                .build();

        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping("/spendings/{spending-date}")
    public ResponseEntity<ApiResponse> createSpending(
            @RequestBody Set<Spending> spendings,
            @PathVariable("spending-date") @DateTimeFormat(pattern = Constants.DATE_FORMAT) Date spendingDate) {

        spendingService.createSpending(spendings, spendingDate, getUserId());
        ApiResponse apiResponse = new ApiResponse.ApiResponseBuilder()
                .setHttpStatus(HttpStatus.OK)
                .setMessage("Success")
                .setOk(true)
                .build();

        return ResponseEntity.ok(apiResponse);
    }

    @PutMapping("/spendings/{spending-date}")
    public ResponseEntity<ApiResponse> updateSpending(
            @RequestBody Set<Spending> spendings,
            @PathVariable("spending-date") @DateTimeFormat(pattern = Constants.DATE_FORMAT) Date spendingDate) {

        spendingService.updateSpending(spendings, spendingDate, getUserId());
        ApiResponse<List<Spending>> apiResponse = new ApiResponse.ApiResponseBuilder<List<Spending>>()
                .setHttpStatus(HttpStatus.OK)
                .setOk(true)
                .setMessage("Updated spending for spending date: " + spendingDate)
                .build();

        return ResponseEntity.ok(apiResponse);
    }

    @DeleteMapping("/spendings/{spending-user-aggr-id}")
    public ResponseEntity<ApiResponse> deleteSpending(
            @PathVariable("spending-user-aggr-id") long spendingUserAggrId) {
        spendingService.deleteSpending(spendingUserAggrId);
        ApiResponse<List<Spending>> apiResponse = new ApiResponse.ApiResponseBuilder<List<Spending>>()
                .setHttpStatus(HttpStatus.OK)
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

    private void validateListQueryParams(String groupBy, String type, int page, int limit) {
        if (!Constants.GROUP_BY.contains(groupBy)) {
            throw new IllegalArgumentException(groupBy + " is not a valid option! Must be on of: " + Constants.GROUP_BY);
        }

        if (!Constants.REQUEST_TYPES.contains(type)) {
            throw new IllegalArgumentException(type + " is not a valid option! Must be on of: " + Constants.REQUEST_TYPES);
        }

        if (page < 0) {
            throw new IllegalArgumentException("Page number must be non-negative!");
        }

        if (limit <= 0) {
            throw new IllegalArgumentException("Limit must be greater than zero!");
        }

    }
}
