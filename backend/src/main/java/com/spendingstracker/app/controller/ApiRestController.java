package com.spendingstracker.app.controller;

import com.spendingstracker.app.constants.Constants;
import com.spendingstracker.app.model.CustomUserDetails;
import com.spendingstracker.app.model.Spending;
import com.spendingstracker.app.model.SpendingUserAggr;
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
    public ResponseEntity<ApiResponse<List<SpendingUserAggr>>> getSpendings(
            @RequestParam(name = "start-date", defaultValue = "1000-01-01") @DateTimeFormat(pattern = Constants.DATE_FORMAT) Date startDate,
            @RequestParam(name = "end-date", defaultValue = "9999-12-31") @DateTimeFormat(pattern = Constants.DATE_FORMAT) Date endDate,
            @RequestParam(name = "page", defaultValue = "0") Integer page,
            @RequestParam(name = "limit", defaultValue = "25") Integer limit,
            HttpServletRequest request)
    throws IllegalArgumentException {
        if (page < 0) {
            throw new IllegalArgumentException("Page number must be non-negative!");
        }

        if (limit <= 0) {
            throw new IllegalArgumentException("Limit must be greater than zero!");
        }

        Page<SpendingUserAggr> spendings = spendingService.getSpendings(getUserId(), startDate, endDate, page, limit);
        ApiLinks apiLinks = new ApiLinks.ApiLinksBuilder(request.getRequestURI(), request.getQueryString(), page, spendings.getTotalPages()-1).build();

        ApiMetadata apiMetadata = new ApiMetadata.ApiMetadataBuilder()
                .setCurrentPage(page)
                .setLinks(apiLinks)
                .setTotalPages(spendings.getTotalPages())
                .setPageSize(limit)
                .setTotalCount(spendings.getTotalElements())
                .build();

        ApiResponse<List<SpendingUserAggr>> apiResponse = new ApiResponse.ApiResponseBuilder<List<SpendingUserAggr>>()
                .setHttpStatus(HttpStatus.OK)
                .setOk(true)
                .setMetadata(apiMetadata)
                .setData(spendings.getContent())
                .build();

        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping("/spendings/{spending-date}")
    public ResponseEntity<ApiResponse> saveSpending(@RequestBody Set<Spending> spendings,
                                                    @PathVariable("spending-date") @DateTimeFormat(pattern = Constants.DATE_FORMAT) Date spendingDate) {
        spendingService.saveSpending(getUserId(), spendings, spendingDate);

        ApiResponse apiResponse = new ApiResponse.ApiResponseBuilder()
                .setHttpStatus(HttpStatus.OK)
                .setMessage("Success")
                .setOk(true)
                .build();

        return ResponseEntity.ok(apiResponse);
    }

    @DeleteMapping("/spendings/{spending-date}")
    public ResponseEntity<ApiResponse> deleteSpendingsByDate(@PathVariable("spending-date") @DateTimeFormat(pattern = Constants.DATE_FORMAT) Date spendingDate) throws Exception {
        spendingService.deleteSpendingByDate(getUserId(), spendingDate);
        ApiResponse apiResponse = new ApiResponse.ApiResponseBuilder()
                .setHttpStatus(HttpStatus.OK)
                .setMessage("Success")
                .setOk(true)
                .build();

        return ResponseEntity.ok(apiResponse);
    }

    private long getUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
        return userDetails.getUserId();
    }
}
