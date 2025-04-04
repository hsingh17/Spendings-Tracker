package com.spendingstracker.app.service.spending;

import com.spendingstracker.app.cache.SpendingCategoryJpaCache;
import com.spendingstracker.app.constants.GraphType;
import com.spendingstracker.app.constants.SpendingCategoryEnum;
import com.spendingstracker.app.dto.requests.GetSpendingsRequestFilters;
import com.spendingstracker.app.dto.requests.SpendingRequest;
import com.spendingstracker.app.dto.requests.SpendingsSaveRequest;
import com.spendingstracker.app.dto.response.SpendingDetailsResponse;
import com.spendingstracker.app.dto.response.SpendingPageItem;
import com.spendingstracker.app.dto.response.SpendingPageResponse;
import com.spendingstracker.app.dto.response.SpendingResponse;
import com.spendingstracker.app.entity.Spending;
import com.spendingstracker.app.entity.SpendingCategory;
import com.spendingstracker.app.entity.SpendingUserAggr;
import com.spendingstracker.app.entity.User;
import com.spendingstracker.app.exception.NoSuchGraphTypeException;
import com.spendingstracker.app.exception.SpendingNotFoundException;
import com.spendingstracker.app.projection.SpendingProjection;
import com.spendingstracker.app.repository.SpendingRepository;
import com.spendingstracker.app.repository.SpendingUserAggrRepository;
import com.spendingstracker.app.service.auth.CurrentUserService;
import com.spendingstracker.app.service.user.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDate;
import java.util.*;

/**
 * Implementation of the SpendingService interface. Please see SpendingService for related JavaDocs.
 *
 * @see SpendingService
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class SpendingServiceImpl implements SpendingService {
    private final SpendingRepository spendingRepository;
    private final SpendingUserAggrRepository spendingUserAggrRepository;
    private final UserService userService;
    private final SpendingCategoryJpaCache spendingCategoryJpaCache;
    private final CurrentUserService currentUserService;

    public SpendingPageResponse getSpendings(GetSpendingsRequestFilters filters) {
        PageRequest pageRequest = PageRequest.of(filters.getPage(), filters.getLimit());
        BigInteger userId = currentUserService.getCurrentUserId();
        Page<? extends SpendingPageItem> spendingItems =
                getSpendingListProj(userId, filters, pageRequest);
        return new SpendingPageResponse(spendingItems);
    }

    public SpendingDetailsResponse getSpendingDetails(LocalDate spendingDate) {
        BigInteger userId = currentUserService.getCurrentUserId();
        List<SpendingProjection> spendings =
                spendingUserAggrRepository.findSpendingDetailsByUserIdAndDate(spendingDate, userId);
        List<SpendingResponse> spendingResponse = new ArrayList<>();

        for (SpendingProjection spending : spendings) {
            spendingResponse.add(new SpendingResponse(spending));
        }

        return new SpendingDetailsResponse(spendingResponse);
    }

    public void updateSpending(SpendingsSaveRequest spendingsSaveRequest, LocalDate spendingDate) {
        BigInteger userId = currentUserService.getCurrentUserId();
        User user = userService.getUserById(userId);
        SpendingUserAggr spendingUserAggr = findSpendingUserAggrByUserAndDate(user, spendingDate);
        mergeWithExistingSpending(spendingUserAggr, spendingsSaveRequest.spendingRequests());
        spendingUserAggrRepository.save(spendingUserAggr);
    }

    public void createSpending(SpendingsSaveRequest spendingsSaveRequest, LocalDate spendingDate) {
        BigInteger userId = currentUserService.getCurrentUserId();
        User user = userService.getUserById(userId);

        List<Spending> spendings = new ArrayList<>();
        for (SpendingRequest spendingRequest : spendingsSaveRequest.spendingRequests()) {
            SpendingCategory spendingCategory =
                    spendingCategoryJpaCache.getFromCache(spendingRequest.category());

            spendings.add(
                    new Spending(
                            spendingCategory, spendingRequest.amount(), spendingRequest.memo()));
        }

        SpendingUserAggr spendingUserAggr = new SpendingUserAggr(user, spendingDate, spendings);
        spendingUserAggrRepository.save(spendingUserAggr);
    }

    public void deleteSpending(BigInteger spendingUserAggrId) {
        spendingUserAggrRepository.deleteById(spendingUserAggrId);
    }

    private void mergeWithExistingSpending(
            SpendingUserAggr spendingUserAggr, List<SpendingRequest> spendingReqs) {
        for (SpendingRequest spendingRequest : spendingReqs) {
            SpendingCategoryEnum category = spendingRequest.category();
            BigDecimal amount = spendingRequest.amount();
            String memo = spendingRequest.memo();

            SpendingCategory spendingCategory = spendingCategoryJpaCache.getFromCache(category);

            // Brand new spending added
            if (spendingRequest.spendingId() == null) {
                spendingUserAggr.addSpending(new Spending(spendingCategory, amount, memo));
                continue;
            }

            // Update/Delete existing spending
            Spending spending = getSpendingFromId(spendingRequest.spendingId());
            if (spendingRequest.delete()) {
                spendingUserAggr.removeSpending(spending);
            } else {
                spending.setMemo(memo);
                spending.setSpendingCategory(spendingCategory);
                spending.setAmount(amount);
                spendingUserAggr.addSpending(spending);
            }
        }
    }

    private Spending getSpendingFromId(BigInteger spendingId) {
        log.debug("Finding spending for SPENDING_ID {}", spendingId);
        return spendingRepository
                .findById(spendingId)
                .orElseThrow(
                        () -> {
                            String errMsg = "No spending found with SPENDING_ID " + spendingId;
                            log.error(errMsg);
                            return new SpendingNotFoundException(errMsg);
                        });
    }

    private SpendingUserAggr findSpendingUserAggrByUserAndDate(User user, LocalDate spendingDate) {
        return spendingUserAggrRepository
                .findSpendingUserAggrByUserAndDate(user, spendingDate)
                .orElseThrow(
                        () ->
                                new IllegalArgumentException(
                                        "Can't find spendingUserAggr for date: " + spendingDate));
    }

    private Page<? extends SpendingPageItem> getSpendingListProj(
            BigInteger userId, GetSpendingsRequestFilters filters, PageRequest pageRequest) {
        GraphType type = filters.getGraphType();

        switch (type) {
            case PIE -> {
                return spendingUserAggrRepository.findSpendingsForPieChart(
                        userId, filters.getStartDate(), filters.getEndDate(), pageRequest);
            }
            case BAR -> {
                return spendingUserAggrRepository.findSpendingsForBarChart(
                        userId,
                        filters.getStartDate(),
                        filters.getEndDate(),
                        filters.getGranularity(),
                        pageRequest);
            }
            case LINE -> {
                return spendingUserAggrRepository.findSpendingsForLineChart(
                        userId,
                        filters.getStartDate(),
                        filters.getEndDate(),
                        filters.getGranularity(),
                        pageRequest);
            }

            default -> {
                String errMsg = "No such graphType " + type;
                log.error(errMsg);
                throw new NoSuchGraphTypeException(errMsg);
            }
        }
    }
}
