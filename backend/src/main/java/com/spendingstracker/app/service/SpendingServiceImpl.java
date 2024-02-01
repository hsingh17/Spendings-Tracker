package com.spendingstracker.app.service;

import com.spendingstracker.app.constants.GraphType;
import com.spendingstracker.app.constants.GroupBy;
import com.spendingstracker.app.entity.Spending;
import com.spendingstracker.app.entity.SpendingUserAggr;
import com.spendingstracker.app.entity.User;
import com.spendingstracker.app.projection.SpendingsListProjection;
import com.spendingstracker.app.repository.SpendingUserAggrRepository;
import com.spendingstracker.app.repository.UserRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class SpendingServiceImpl implements SpendingService {
    private final SpendingUserAggrRepository spendingUserAggrRepository;

    private final UserRepository userRepository;

    public SpendingServiceImpl(
            SpendingUserAggrRepository spendingUserAggrRepository, UserRepository userRepository) {
        this.spendingUserAggrRepository = spendingUserAggrRepository;
        this.userRepository = userRepository;
    }

    public Page<SpendingsListProjection> getSpendings(
            long userId,
            Date startDate,
            Date endDate,
            int page,
            int limit,
            GroupBy groupBy,
            GraphType type) {
        PageRequest pageRequest = PageRequest.of(page, limit);

        switch (type) {
            case BAR:
            case PIE:
                return spendingUserAggrRepository.findSpendingsCategorical(
                        userId, startDate, endDate, pageRequest);
            case LINE:
                switch (groupBy) {
                    case DAY:
                        return spendingUserAggrRepository.findSpendingsNumericalGroupByDay(
                                userId, startDate, endDate, pageRequest);
                    case WEEK:
                        return spendingUserAggrRepository.findSpendingsNumericalGroupByWeek(
                                userId, startDate, endDate, pageRequest);
                    case MONTH:
                        return spendingUserAggrRepository.findSpendingsNumericalGroupByMonth(
                                userId, startDate, endDate, pageRequest);
                    case YEAR:
                        return spendingUserAggrRepository.findSpendingsNumericalGroupByYear(
                                userId, startDate, endDate, pageRequest);
                }
        }

        throw new RuntimeException("Could not get spendings!");
    }

    public List<Spending> getSpendingDetails(Date spendingDate, long userId) {
        User user =
                userRepository
                        .findById(userId)
                        .orElseThrow(() -> new UsernameNotFoundException("User not found!"));
        Optional<SpendingUserAggr> spendingUserAggrOpt =
                spendingUserAggrRepository.findSpendingUserAggrByUserAndDate(user, spendingDate);

        return spendingUserAggrOpt
                .map(spendingUserAggr -> new ArrayList<>(spendingUserAggr.getSpendings()))
                .orElse(null);
    }

    public void updateSpending(Set<Spending> spendings, Date spendingDate, long userId) {
        User user =
                userRepository
                        .findById(userId)
                        .orElseThrow(() -> new UsernameNotFoundException("User not found!"));
        SpendingUserAggr spendingUserAggr =
                spendingUserAggrRepository
                        .findSpendingUserAggrByUserAndDate(user, spendingDate)
                        .orElseThrow(
                                () ->
                                        new IllegalArgumentException(
                                                "Can't find spendingUserAggr for date: "
                                                        + spendingDate));

        Set<Spending> spendingsToKeep = filterSpendings(spendings);

        if (spendingsToKeep
                .isEmpty()) { // User decided to delete all the spendings, therefore, this is
            // effectively a delete operation
            deleteSpending(spendingUserAggr.getSpendingUserAggrId());
            return;
        }

        spendingUserAggr.emptySpendings(); // Remove all old spendings
        spendingUserAggr.addSpendings(spendingsToKeep); // Add the spendings to this date

        spendingUserAggrRepository.save(spendingUserAggr);
    }

    public void createSpending(Set<Spending> spendings, Date spendingDate, long userId) {
        User user =
                userRepository
                        .findById(userId)
                        .orElseThrow(() -> new UsernameNotFoundException("User not found!"));

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
}
