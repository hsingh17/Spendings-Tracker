package com.spendingstracker.app.controller.spending;

import com.spendingstracker.app.dto.CustomUserDetails;
import com.spendingstracker.app.dto.requests.GetSpendingsRequestFilters;
import com.spendingstracker.app.dto.requests.SpendingsSaveRequest;
import com.spendingstracker.app.dto.response.*;
import com.spendingstracker.app.projection.SpendingListProjection;
import com.spendingstracker.app.service.spending.SpendingCategoryService;
import com.spendingstracker.app.service.spending.SpendingService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.time.LocalDate;

/** Controller class containing the routes for performing CRUD operations on a user's spendings. */
@RestController
@RequestMapping("/v1/api")
@Slf4j
public class SpendingsController {
    private final SpendingService spendingService;
    private final SpendingCategoryService spendingCategoryService;

    /**
     * Instantiate the <code>SpendingsController</code> from a <code>SpendingService</code> object.
     *
     * @param spendingService <code>SpendingService</code> object
     * @see SpendingService
     */
    public SpendingsController(
            SpendingService spendingService, SpendingCategoryService spendingCategoryService) {
        this.spendingService = spendingService;
        this.spendingCategoryService = spendingCategoryService;
    }

    /**
     * Route for returning the user's spendings based on the query params passed in.
     *
     * @param filters object that stores all necessary filters for the request
     * @param request <code>HttpServletRequest</code> object, used to build the <code>ApiLinks
     *     </code> object
     * @return <code>{@literal ResponseEntity<ApiResponse<List<SpendingsListProjection>>>}</code>
     * @throws IllegalArgumentException when one of the <code>RequestParam</code> passed in do not
     *     pass validation.
     * @see SpendingListProjection
     * @see ApiLinks
     * @see ApiMetadata
     * @see ApiResponse
     */
    @GetMapping("/spendings")
    public ResponseEntity<ApiResponse<SpendingPageResponse>> getSpendings(
            @Valid GetSpendingsRequestFilters filters, HttpServletRequest request)
            throws IllegalArgumentException {
        log.info("GET /spendings{}", filters);

        SpendingPageResponse spendingPageResponse =
                spendingService.getSpendings(getUserId(), filters);
        Page<SpendingPageItem> spendingsPage = spendingPageResponse.getSpendingPage();

        ApiLinks apiLinks =
                buildApiLinks(
                        request.getRequestURI(),
                        request.getQueryString(),
                        filters.getPage(),
                        spendingsPage.getTotalPages() - 1);

        ApiMetadata apiMetadata =
                buildApiMetadata(
                        filters.getPage(),
                        apiLinks,
                        spendingsPage.getTotalPages(),
                        spendingsPage.getNumberOfElements(),
                        spendingsPage.getTotalElements());

        ApiResponse<SpendingPageResponse> response =
                buildOkApiResponse(spendingPageResponse, null, apiMetadata);

        return ResponseEntity.ok(response);
    }

    /**
     * Route to get the details of a particular spending on a certain <code>spendingDate</code>.
     *
     * @param spendingDate date of the spending for which the details were requested
     * @return <code>{@literal ResponseEntity<ApiResponse<List<Spending>>>}</code> the list of
     *     spendings that are associated to that date.
     * @see ApiResponse
     */
    @GetMapping("/spendings/{spending-date}")
    public ResponseEntity<ApiResponse<SpendingDetailsResponse>> getSpendingDetails(
            @PathVariable("spending-date") LocalDate spendingDate) {
        log.info("GET /spendings/" + spendingDate);

        SpendingDetailsResponse spendingsResponse =
                spendingService.getSpendingDetails(spendingDate, getUserId());

        ApiResponse<SpendingDetailsResponse> response =
                buildOkApiResponse(spendingsResponse, null, null);

        return ResponseEntity.ok(response);
    }

    /**
     * Route to create spendings for a certain date.
     *
     * @param spendingsSaveRequest <code>{@literal SpendingsSaveRequest}</code> objects that user
     *     wants to create.
     * @param spendingDate the date for which the <code>spendings</code> should be created for.
     * @return <code>{@literal ResponseEntity<ApiResponse<Object>>}</code> an OK <code>ApiResponse
     *     </code>
     * @see ApiResponse
     */
    @PostMapping("/spendings/{spending-date}")
    public ResponseEntity<ApiResponse<Object>> createSpending(
            @RequestBody SpendingsSaveRequest spendingsSaveRequest,
            @PathVariable("spending-date") LocalDate spendingDate) {
        log.info("POST /spendings/" + spendingDate);

        spendingService.createSpending(spendingsSaveRequest, spendingDate, getUserId());

        int N = spendingsSaveRequest.spendingRequests().size();
        ApiResponse<Object> response =
                buildOkApiResponse(
                        null, "Created " + N + " spendings for date " + spendingDate, null);

        return ResponseEntity.ok(response);
    }

    /**
     * Route to update spendings for a certain day.
     *
     * @param spendingsSaveRequest <code>{@literal SpendingsSaveRequest}</code> objects that user
     *     wants to create.
     * @param spendingDate day for which spendings need to be updated for
     * @return <code>{@literal ResponseEntity<ApiResponse<Object>>}</code> an OK <code>ApiResponse
     *     </code>
     * @see ApiResponse
     */
    @PutMapping("/spendings/{spending-date}")
    public ResponseEntity<ApiResponse<Object>> updateSpending(
            @RequestBody SpendingsSaveRequest spendingsSaveRequest,
            @PathVariable("spending-date") LocalDate spendingDate) {
        log.info("PUT /spendings/" + spendingDate);

        spendingService.updateSpending(spendingsSaveRequest, spendingDate, getUserId());
        ApiResponse<Object> response =
                buildOkApiResponse(
                        null, "Updated spending for spending date: " + spendingDate, null);

        return ResponseEntity.ok(response);
    }

    /**
     * Route to delete an entire spending day
     *
     * @param spendingUserAggrId the primary key for the <code>SPENDING_USER_AGGR</code> table that
     *     is associated to these spendings.
     * @return <code>{@literal ResponseEntity<ApiResponse<Object>>}</code> an OK <code>ApiResponse
     *     </code>
     * @see ApiResponse
     */
    @DeleteMapping("/spendings/{spending-user-aggr-id}")
    public ResponseEntity<ApiResponse<Object>> deleteSpending(
            @PathVariable("spending-user-aggr-id") BigInteger spendingUserAggrId) {
        log.info("DELETE /spendings/" + spendingUserAggrId);

        spendingService.deleteSpending(spendingUserAggrId);
        ApiResponse<Object> response =
                buildOkApiResponse(null, "Deleted spending for id: " + spendingUserAggrId, null);

        return ResponseEntity.ok(response);
    }

    /**
     * Route to get all active spending categories
     *
     * @return All active spending categories
     * @see ApiResponse
     * @see SpendingCategoriesResponse
     */
    @GetMapping("/spending-categories")
    public ResponseEntity<ApiResponse<SpendingCategoriesResponse>> getSpendingCategories() {
        log.info("GET /spending-categories");
        SpendingCategoriesResponse spendingCategoriesResponse =
                spendingCategoryService.getSpendingCategories();
        ApiResponse<SpendingCategoriesResponse> response =
                buildOkApiResponse(
                        spendingCategoriesResponse,
                        "Returned "
                                + spendingCategoriesResponse.categoryToS3UrlMap().size()
                                + " categories",
                        null);

        return ResponseEntity.ok(response);
    }

    /**
     * @return the user ID of the authenticated user
     */
    private BigInteger getUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
        return userDetails.getUserId();
    }

    private ApiMetadata buildApiMetadata(
            int curPage, ApiLinks apiLinks, int totalPages, int pageSize, long totalCount) {
        return new ApiMetadata.ApiMetadataBuilder()
                .setCurrentPage(curPage)
                .setLinks(apiLinks)
                .setTotalPages(totalPages)
                .setPageSize(pageSize) // How many elements were returned
                // in this page
                .setTotalCount(totalCount)
                .build();
    }

    private ApiLinks buildApiLinks(
            String requestUri, String queryString, int curPage, int lastPage) {
        return new ApiLinks.ApiLinksBuilder(requestUri, queryString, curPage, lastPage).build();
    }

    private <T> ApiResponse<T> buildOkApiResponse(T data, String message, ApiMetadata metadata) {
        return new ApiResponse.ApiResponseBuilder<T>()
                .setHttpStatus(HttpStatus.OK.value())
                .setOk(true)
                .setData(data)
                .setMessage(message)
                .setMetadata(metadata)
                .build();
    }
}
