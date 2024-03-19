package com.spendingstracker.app.service;

import com.spendingstracker.app.constants.Granularity;
import com.spendingstracker.app.constants.GraphType;
import com.spendingstracker.app.dto.requests.SpendingRequest;
import com.spendingstracker.app.dto.requests.SpendingsSaveRequest;
import com.spendingstracker.app.dto.response.SpendingDetailsResponse;
import com.spendingstracker.app.dto.response.SpendingResponse;
import com.spendingstracker.app.entity.Spending;
import com.spendingstracker.app.entity.SpendingUserAggr;
import com.spendingstracker.app.entity.User;
import com.spendingstracker.app.exception.NoSuchGraphTypeException;
import com.spendingstracker.app.exception.SpendingNotFoundException;
import com.spendingstracker.app.projection.SpendingProjection;
import com.spendingstracker.app.projection.SpendingsListProjection;
import com.spendingstracker.app.repository.SpendingRepository;
import com.spendingstracker.app.repository.SpendingUserAggrRepository;
import com.spendingstracker.app.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    private final UserRepository userRepository;

    public SpendingServiceImpl(
            SpendingRepository spendingRepository,
            SpendingUserAggrRepository spendingUserAggrRepository,
            UserRepository userRepository) {
        this.spendingRepository = spendingRepository;
        this.spendingUserAggrRepository = spendingUserAggrRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public Page<SpendingsListProjection> getSpendings(
            long userId,
            LocalDate startDate,
            LocalDate endDate,
            int page,
            int limit,
            Granularity granularity,
            GraphType type) {
        PageRequest pageRequest = PageRequest.of(page, limit);

        switch (type) {
            case BAR, PIE -> {
                return spendingUserAggrRepository.findSpendingsCategorical(
                        userId, startDate, endDate, pageRequest);
            }
            case LINE -> {
                return switch (granularity) {
                    case DAY ->
                            spendingUserAggrRepository.findSpendingsNumericalGroupByDay(
                                    userId, startDate, endDate, pageRequest);
                    case WEEK ->
                            spendingUserAggrRepository.findSpendingsNumericalGroupByWeek(
                                    userId, startDate, endDate, pageRequest);
                    case MONTH ->
                            spendingUserAggrRepository.findSpendingsNumericalGroupByMonth(
                                    userId, startDate, endDate, pageRequest);
                    case YEAR ->
                            spendingUserAggrRepository.findSpendingsNumericalGroupByYear(
                                    userId, startDate, endDate, pageRequest);
                };
            }
            default -> {
                String errMsg = "No such graphType " + type;
                log.error(errMsg);
                throw new NoSuchGraphTypeException(errMsg);
            }
        }
    }

    @Transactional(readOnly = true)
    public SpendingDetailsResponse getSpendingDetails(LocalDate spendingDate, long userId) {
        List<SpendingProjection> spendings =
                spendingUserAggrRepository.findSpendingDetailsByUserIdAndDate(spendingDate, userId);

        List<SpendingResponse> spendingResponse = new ArrayList<>();

        for (SpendingProjection spending : spendings) {
            spendingResponse.add(buildSpendingResponseFromSpendingProj(spending));
        }

        return SpendingDetailsResponse.builder().spendings(spendingResponse).build();
    }

    public void updateSpending(
            SpendingsSaveRequest spendingsSaveRequest, LocalDate spendingDate, long userId) {
        Set<SpendingRequest> spendingsToKeep =
                filterSpendings(spendingsSaveRequest.spendingRequests());

        Set<Spending> spendings = getSpendingEntitysFromSpendingRequests(spendingsToKeep);

        User user = getUser(userId);

        SpendingUserAggr spendingUserAggr =
                spendingUserAggrRepository
                        .findSpendingUserAggrByUserAndDate(user, spendingDate)
                        .orElseThrow(
                                () ->
                                        new IllegalArgumentException(
                                                "Can't find spendingUserAggr for date: "
                                                        + spendingDate));

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
            SpendingsSaveRequest spendingsSaveRequest, LocalDate spendingDate, long userId) {
        Set<SpendingRequest> spendingsToKeep =
                filterSpendings(spendingsSaveRequest.spendingRequests());

        Set<Spending> spendings = getSpendingEntitysFromSpendingRequests(spendingsToKeep);

        User user = getUser(userId);

        SpendingUserAggr spendingUserAggr = new SpendingUserAggr(user, spendingDate, spendings);
        user.addSpendingUserAggr(spendingUserAggr); // Add new spending date to the user

        // We save the user (won't create a new user) and all the new spendings will cascade
        userRepository.save(user);
    }

    public void deleteSpending(long spendingUserAggrId) {
        spendingUserAggrRepository.deleteById(spendingUserAggrId);
    }

    private Set<SpendingRequest> filterSpendings(Set<SpendingRequest> spendingsRequests) {
        Map<String, List<SpendingRequest>> mappedSpendings =
                spendingsRequests.stream()
                        .filter(spending -> !spending.isDelete())
                        .collect(Collectors.groupingBy(SpendingRequest::getCategory));
        // Group by category in case there
        // are multiple spendings in the
        // same category

        // Combine the spendings in the same category to be a single object
        Set<SpendingRequest> spendingsToKeep = new HashSet<>();
        for (List<SpendingRequest> mergedSpendings : mappedSpendings.values()) {
            Optional<SpendingRequest> mergedSpending =
                    mergedSpendings.stream().reduce(SpendingRequest::merge);

            mergedSpending.ifPresent(spendingsToKeep::add);
        }

        return spendingsToKeep;
    }

    private User getUser(long userId) {
        return userRepository
                .findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found!"));
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
            spendings.add(getSpendingEntityFromSpendingRequest(spendingRequest));
        }

        return spendings;
    }

    private Spending getSpendingEntityFromSpendingRequest(SpendingRequest spendingRequest) {
        long spendingId = spendingRequest.getSpendingId();
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
}
