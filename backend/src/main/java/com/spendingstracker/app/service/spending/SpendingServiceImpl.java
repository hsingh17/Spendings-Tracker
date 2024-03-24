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

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

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
        Set<SpendingRequest> spendingsToKeep =
                filterSpendings(spendingsSaveRequest.spendingRequests());

        Set<Spending> spendings = getSpendingEntitysFromSpendingRequests(spendingsToKeep);

        User user = userService.getUserById(userId);

        SpendingUserAggr spendingUserAggr = findSpendingUserAggrByUserAndDate(user, spendingDate);

        // User decided to delete all the spendings, therefore, this is
        // effectively a delete operation
        if (spendingsToKeep.isEmpty()) {
            deleteSpending(spendingUserAggr.getSpendingUserAggrId());
            return;
        }

        spendingUserAggr.emptySpendings(); // Remove all old spendings
        spendingUserAggr.addSpendings(spendings); // Add the spendings to this date

        spendingUserAggrRepository.save(spendingUserAggr);
    }

    public void createSpending(
            SpendingsSaveRequest spendingsSaveRequest, LocalDate spendingDate, BigInteger userId) {
        Set<SpendingRequest> spendingsToKeep =
                filterSpendings(spendingsSaveRequest.spendingRequests());

        Set<Spending> spendings = getSpendingEntitysFromSpendingRequests(spendingsToKeep);

       User user = userService.getUserById(userId);

        SpendingUserAggr spendingUserAggr = new SpendingUserAggr(user, spendingDate, spendings);
        spendingUserAggrRepository.save(spendingUserAggr);
    }

    public void deleteSpending(BigInteger spendingUserAggrId) {
        spendingUserAggrRepository.deleteById(spendingUserAggrId);
    }

    private Set<SpendingRequest> filterSpendings(Set<SpendingRequest> spendingsRequests) {
        // Group by category in case there are multiple spendings in the same category
        Map<String, List<SpendingRequest>> mappedSpendings =
                spendingsRequests.stream()
                        .filter(spending -> !spending.isDelete())
                        .collect(Collectors.groupingBy(SpendingRequest::getCategory));

        // Combine the spendings in the same category to be a single object
        Set<SpendingRequest> spendingsToKeep = new HashSet<>();
        for (List<SpendingRequest> mergedSpendings : mappedSpendings.values()) {
            Optional<SpendingRequest> mergedSpending =
                    mergedSpendings.stream().reduce(SpendingRequest::merge);

            mergedSpending.ifPresent(spendingsToKeep::add);
        }

        return spendingsToKeep;
    }

    private SpendingResponse buildSpendingResponseFromSpendingProj(
            SpendingProjection spendingProj) {
        return SpendingResponse.builder()
                .spendingId(spendingProj.getSpendingId())
                .category(spendingProj.getCategory())
                .amount(spendingProj.getAmount())
                .build();
    }

    private Set<Spending> getSpendingEntitysFromSpendingRequests(
            Set<SpendingRequest> spendingRequests) {
        Set<Spending> spendings = new HashSet<>();

        for (SpendingRequest spendingRequest : spendingRequests) {
            if (spendingRequest.getSpendingId() == null) {
                spendings.add(
                        new Spending(spendingRequest.getCategory(), spendingRequest.getAmount()));
            } else {
                spendings.add(getSpendingEntityFromSpendingRequest(spendingRequest));
            }
        }

        return spendings;
    }

    private Spending getSpendingEntityFromSpendingRequest(SpendingRequest spendingRequest) {
        BigInteger spendingId = spendingRequest.getSpendingId();
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
