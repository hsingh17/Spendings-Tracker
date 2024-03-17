package com.spendingstracker.app.service;

import com.spendingstracker.app.constants.Granularity;
import com.spendingstracker.app.constants.GraphType;
import com.spendingstracker.app.dto.response.SpendingDetailsResponse;
import com.spendingstracker.app.dto.response.SpendingResponse;
import com.spendingstracker.app.entity.Spending;
import com.spendingstracker.app.entity.SpendingUserAggr;
import com.spendingstracker.app.entity.User;
import com.spendingstracker.app.exception.NoSuchGraphTypeException;
import com.spendingstracker.app.projection.SpendingsListProjection;
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
    private final SpendingUserAggrRepository spendingUserAggrRepository;
    private final UserRepository userRepository;

    public SpendingServiceImpl(
            SpendingUserAggrRepository spendingUserAggrRepository, UserRepository userRepository) {
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
        User user = getUser(userId);

        Optional<SpendingUserAggr> spendingUserAggrOpt =
                spendingUserAggrRepository.findSpendingUserAggrByUserAndDate(user, spendingDate);

        if (spendingUserAggrOpt.isEmpty()) {
            return null;
        }

        SpendingUserAggr spendingUserAggr = spendingUserAggrOpt.get();
        Set<Spending> spendings = spendingUserAggr.getSpendings();
        List<SpendingResponse> spendingResponse = new ArrayList<>();

        for (Spending spending : spendings) {
            spendingResponse.add(buildSpendingResponseFromSpendingEntity(spending));
        }

        return SpendingDetailsResponse.builder().spendings(spendingResponse).build();
    }

    public void updateSpending(Set<Spending> spendings, LocalDate spendingDate, long userId) {
        User user = getUser(userId);

        SpendingUserAggr spendingUserAggr =
                spendingUserAggrRepository
                        .findSpendingUserAggrByUserAndDate(user, spendingDate)
                        .orElseThrow(
                                () ->
                                        new IllegalArgumentException(
                                                "Can't find spendingUserAggr for date: "
                                                        + spendingDate));

        Set<Spending> spendingsToKeep = filterSpendings(spendings);

        // User decided to delete all the spendings, therefore, this is
        // effectively a delete operation
        if (spendingsToKeep.isEmpty()) {
            deleteSpending(spendingUserAggr.getSpendingUserAggrId());
            return;
        }

        spendingUserAggr.emptySpendings(); // Remove all old spendings
        spendingUserAggr.addSpendings(spendingsToKeep); // Add the spendings to this date

        spendingUserAggrRepository.save(spendingUserAggr);
    }

    public void createSpending(Set<Spending> spendings, LocalDate spendingDate, long userId) {
        User user = getUser(userId);

        spendings = filterSpendings(spendings);
        SpendingUserAggr spendingUserAggr = new SpendingUserAggr(user, spendingDate, spendings);
        user.addSpendingUserAggr(spendingUserAggr); // Add new spending date to the user

        // We save the user (won't create a new user) and all the new spendings will cascade
        userRepository.save(user);
    }

    public void deleteSpending(long spendingUserAggrId) {
        spendingUserAggrRepository.deleteById(spendingUserAggrId);
    }

    private Set<Spending> filterSpendings(Set<Spending> spendings) {
        Map<String, List<Spending>> mappedSpendings =
                spendings.stream()
                        .filter(spending -> !spending.isDelete())
                        .collect(Collectors.groupingBy(Spending::getCategory));
        // Group by category in case there
        // are multiple spendings in the
        // same category

        // Combine the spendings in the same category to be a single object
        Set<Spending> spendingsToKeep = new HashSet<>();
        for (List<Spending> mergedSpendings : mappedSpendings.values()) {
            Optional<Spending> mergedSpending = mergedSpendings.stream().reduce(Spending::merge);
            mergedSpending.ifPresent(spendingsToKeep::add);
        }

        return spendingsToKeep;
    }

    private User getUser(long userId) {
        return userRepository
                .findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found!"));
    }

    private SpendingResponse buildSpendingResponseFromSpendingEntity(Spending spending) {
        return SpendingResponse.builder()
                .spendingId(spending.getSpendingId())
                .category(spending.getCategory())
                .amount(spending.getAmount())
                .build();
    }
}
