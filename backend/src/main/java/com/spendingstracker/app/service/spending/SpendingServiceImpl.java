package com.spendingstracker.app.service.spending;

import com.spendingstracker.app.constants.Granularity;
import com.spendingstracker.app.constants.GraphType;
import com.spendingstracker.app.dto.requests.SpendingRequest;
import com.spendingstracker.app.dto.requests.SpendingsSaveRequest;
import com.spendingstracker.app.dto.response.SpendingDetailsResponse;
import com.spendingstracker.app.dto.response.SpendingPageItem;
import com.spendingstracker.app.dto.response.SpendingPageResponse;
import com.spendingstracker.app.dto.response.SpendingResponse;
import com.spendingstracker.app.entity.Spending;
import com.spendingstracker.app.entity.SpendingUserAggr;
import com.spendingstracker.app.entity.User;
import com.spendingstracker.app.exception.NoSuchGranularityException;
import com.spendingstracker.app.exception.NoSuchGraphTypeException;
import com.spendingstracker.app.exception.SpendingNotFoundException;
import com.spendingstracker.app.projection.SpendingListProjection;
import com.spendingstracker.app.projection.SpendingProjection;
import com.spendingstracker.app.repository.SpendingRepository;
import com.spendingstracker.app.repository.SpendingUserAggrRepository;
import com.spendingstracker.app.service.user.UserService;

import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
@Transactional
@Slf4j
public class SpendingServiceImpl implements SpendingService {
    private final SpendingRepository spendingRepository;
    private final SpendingUserAggrRepository spendingUserAggrRepository;
    private final UserService userService;

    public SpendingServiceImpl(
            SpendingRepository spendingRepository,
            SpendingUserAggrRepository spendingUserAggrRepository,
            UserService userService) {
        this.spendingRepository = spendingRepository;
        this.spendingUserAggrRepository = spendingUserAggrRepository;
        this.userService = userService;
    }

    @Transactional(readOnly = true)
    public SpendingPageResponse getSpendings(
            BigInteger userId,
            LocalDate startDate,
            LocalDate endDate,
            int page,
            int limit,
            Granularity granularity,
            GraphType type) {
        PageRequest pageRequest = PageRequest.of(page, limit);
        Page<SpendingListProjection> spendingsListProjs =
                getSpendingListProj(userId, startDate, endDate, granularity, type, pageRequest);

        // No spendings
        if (!spendingsListProjs.hasContent()) {
            return SpendingPageResponse.builder()
                    .spendingPage(new PageImpl<>(Collections.emptyList(), pageRequest, 0))
                    .build();
        }

        List<SpendingPageItem> spendingPageItemList = new ArrayList<>();

        for (SpendingListProjection spendingListProj : spendingsListProjs.getContent()) {
            spendingPageItemList.add(buildSpendingPageItemFromSpendingListProj(spendingListProj));
        }

        Page<SpendingPageItem> spendingPageItemPage =
                new PageImpl<>(spendingPageItemList, pageRequest, spendingPageItemList.size());

        return SpendingPageResponse.builder().spendingPage(spendingPageItemPage).build();
    }

    @Transactional(readOnly = true)
    public SpendingDetailsResponse getSpendingDetails(LocalDate spendingDate, BigInteger userId) {
        List<SpendingProjection> spendings =
                spendingUserAggrRepository.findSpendingDetailsByUserIdAndDate(spendingDate, userId);

        List<SpendingResponse> spendingResponse = new ArrayList<>();

        for (SpendingProjection spending : spendings) {
            spendingResponse.add(buildSpendingResponseFromSpendingProj(spending));
        }

        return SpendingDetailsResponse.builder().spendings(spendingResponse).build();
    }

    public void updateSpending(
            SpendingsSaveRequest spendingsSaveRequest, LocalDate spendingDate, BigInteger userId) {
        User user = userService.getUserById(userId);
        SpendingUserAggr spendingUserAggr = findSpendingUserAggrByUserAndDate(user, spendingDate);
        mergeExistingSpendingsWithRequest(
                spendingUserAggr, spendingsSaveRequest.spendingRequests());
        spendingUserAggrRepository.save(spendingUserAggr);
    }

    public void createSpending(
            SpendingsSaveRequest spendingsSaveRequest, LocalDate spendingDate, BigInteger userId) {
        User user = userService.getUserById(userId);

        Set<Spending> spendings = new HashSet<>();
        for (SpendingRequest spendingReq : spendingsSaveRequest.spendingRequests()) {
            spendings.add(new Spending(spendingReq.getCategory(), spendingReq.getAmount()));
        }

        SpendingUserAggr spendingUserAggr = new SpendingUserAggr(user, spendingDate, spendings);
        spendingUserAggrRepository.save(spendingUserAggr);
    }

    public void deleteSpending(BigInteger spendingUserAggrId) {
        spendingUserAggrRepository.deleteById(spendingUserAggrId);
    }

    private void mergeExistingSpendingsWithRequest(
            SpendingUserAggr spendingUserAggr, Set<SpendingRequest> spendingReqs) {
        for (SpendingRequest spendingRequest : spendingReqs) {
            String category = spendingRequest.getCategory();
            BigDecimal amount = spendingRequest.getAmount();

            // Brand new spending added
            if (spendingRequest.getSpendingId() == null) {
                spendingUserAggr.addSpending(new Spending(category, amount));
                continue;
            }

            // Update/Delete existing spending
            Spending spending = getSpendingFromId(spendingRequest.getSpendingId());
            if (spendingRequest.isDelete()) {
                spendingUserAggr.removeSpending(spending);
            } else {
                spending.setCategory(category);
                spending.setAmount(amount);
                spendingUserAggr.addSpending(spending);
            }
        }
    }

    private SpendingResponse buildSpendingResponseFromSpendingProj(
            SpendingProjection spendingProj) {
        return SpendingResponse.builder()
                .spendingId(spendingProj.getSpendingId())
                .category(spendingProj.getCategory())
                .amount(spendingProj.getAmount())
                .build();
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

    private Page<SpendingListProjection> getSpendingListProj(
            BigInteger userId,
            LocalDate startDate,
            LocalDate endDate,
            Granularity granularity,
            GraphType type,
            PageRequest pageRequest) {
        switch (type) {
            case BAR, PIE -> {
                return getSpendingListProjCategorical(userId, startDate, endDate, pageRequest);
            }
            case LINE -> {
                return getSpendingListProjLine(
                        userId, startDate, endDate, granularity, pageRequest);
            }

            default -> {
                String errMsg = "No such graphType " + type;
                log.error(errMsg);
                throw new NoSuchGraphTypeException(errMsg);
            }
        }
    }

    private Page<SpendingListProjection> getSpendingListProjLine(
            BigInteger userId,
            LocalDate startDate,
            LocalDate endDate,
            Granularity granularity,
            PageRequest pageRequest) {
        switch (granularity) {
            case DAY -> {
                return spendingUserAggrRepository.findSpendingsNumericalGroupByDay(
                        userId, startDate, endDate, pageRequest);
            }
            case WEEK -> {
                return spendingUserAggrRepository.findSpendingsNumericalGroupByWeek(
                        userId, startDate, endDate, pageRequest);
            }
            case MONTH -> {
                return spendingUserAggrRepository.findSpendingsNumericalGroupByMonth(
                        userId, startDate, endDate, pageRequest);
            }
            case YEAR -> {
                return spendingUserAggrRepository.findSpendingsNumericalGroupByYear(
                        userId, startDate, endDate, pageRequest);
            }
            default -> {
                String errMsg = "No such granularity " + granularity;
                log.error(errMsg);
                throw new NoSuchGranularityException(errMsg);
            }
        }
    }

    private Page<SpendingListProjection> getSpendingListProjCategorical(
            BigInteger userId, LocalDate startDate, LocalDate endDate, PageRequest pageRequest) {
        return spendingUserAggrRepository.findSpendingsCategorical(
                userId, startDate, endDate, pageRequest);
    }

    private SpendingPageItem buildSpendingPageItemFromSpendingListProj(
            SpendingListProjection spendingListProj) {
        return SpendingPageItem.builder()
                .spendingUserAggrId(spendingListProj.getSpendingUserAggrId())
                .date(spendingListProj.getDate())
                .category(spendingListProj.getCategory())
                .total(spendingListProj.getTotal())
                .build();
    }
}
