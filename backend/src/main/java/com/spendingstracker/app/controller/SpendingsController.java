package com.spendingstracker.app.controller;

import com.spendingstracker.app.constants.Granularity;
import com.spendingstracker.app.constants.GraphType;
import com.spendingstracker.app.dto.CustomUserDetails;
import com.spendingstracker.app.dto.requests.SpendingsSaveRequest;
import com.spendingstracker.app.dto.response.SpendingDetailsResponse;
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

import java.time.LocalDate;
import java.util.List;

/** Controller class containing the routes for performing CRUD operations on a user's spendings. */
@RestController
@RequestMapping("/v1/api")
@Slf4j
public class SpendingsController {
    private final SpendingService spendingService;

    /**
     * Instantiate the <code>SpendingsController</code> from a <code>SpendingService</code> object.
     *
     * @param spendingService <code>SpendingService</code> object
     * @see SpendingService
     */
    public SpendingsController(SpendingService spendingService) {
        this.spendingService = spendingService;
    }

    /**
     * Route for returning the <b>authenticated</b> user's details.
     *
     * @return <code>{@literal ResponseEntity<ApiResponse<UserDetails>>}</code> the user's details
     * @see UserDetails
     */
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserDetails>> getMe() {
        log.info("GET /me");

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
        ApiResponse<UserDetails> apiResponse = buildOkApiResponse(userDetails, null, null);
        return ResponseEntity.ok(apiResponse);
    }

    /**
     * Route for returning the user's spendings based on the query params passed in.
     *
     * @param startDate date from which to begin looking for spendings.
     * @param endDate date to end looking for spendings.
     * @param granularity the granularity to which the spendings should be grouped by
     * @param graphType the graph type being requested by the user.
     * @param page the page which user is looking for spendings on
     * @param limit the number of spendings to return
     * @param request <code>HttpServletRequest</code> object, used to build the <code>ApiLinks
     *     </code> object
     * @return <code>{@literal ResponseEntity<ApiResponse<List<SpendingsListProjection>>>}</code>
     * @throws IllegalArgumentException when one of the <code>RequestParam</code> passed in do not
     *     pass validation.
     * @see SpendingsListProjection
     * @see Granularity
     * @see GraphType
     * @see ApiLinks
     * @see ApiMetadata
     * @see ApiResponse
     */
    @GetMapping("/spendings")
    public ResponseEntity<ApiResponse<List<SpendingsListProjection>>> getSpendings(
            @RequestParam(name = "start-date", defaultValue = "1000-01-01") LocalDate startDate,
            @RequestParam(name = "end-date", defaultValue = "9999-12-31") LocalDate endDate,
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
                buildApiLinks(
                        request.getRequestURI(),
                        request.getQueryString(),
                        page,
                        spendingsPage.getTotalPages() - 1);

        ApiMetadata apiMetadata =
                buildApiMetadata(
                        page,
                        apiLinks,
                        spendingsPage.getTotalPages(),
                        spendingsPage.getNumberOfElements(),
                        spendingsPage.getTotalElements());

        ApiResponse<List<SpendingsListProjection>> apiResponse =
                buildOkApiResponse(spendingsPage.getContent(), null, apiMetadata);

        return ResponseEntity.ok(apiResponse);
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

        ApiResponse<SpendingDetailsResponse> apiResponse =
                buildOkApiResponse(spendingsResponse, null, null);

        return ResponseEntity.ok(apiResponse);
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
        ApiResponse<Object> apiResponse =
                buildOkApiResponse(
                        null, "Created " + N + " spendings for date " + spendingDate, null);

        return ResponseEntity.ok(apiResponse);
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
        ApiResponse<Object> apiResponse =
                buildOkApiResponse(
                        null, "Updated spending for spending date: " + spendingDate, null);

        return ResponseEntity.ok(apiResponse);
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
            @PathVariable("spending-user-aggr-id") long spendingUserAggrId) {
        log.info("DELETE /spendings/" + spendingUserAggrId);

        spendingService.deleteSpending(spendingUserAggrId);
        ApiResponse<Object> apiResponse =
                buildOkApiResponse(null, "Deleted spending for id: " + spendingUserAggrId, null);

        return ResponseEntity.ok(apiResponse);
    }

    /**
     * @return the user ID of the authenticated user
     */
    private long getUserId() {
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
