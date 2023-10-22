package com.spendingstracker.app.service;

import com.spendingstracker.app.constants.Constants;
import com.spendingstracker.app.entity.Spending;
import com.spendingstracker.app.entity.SpendingUserAggr;
import com.spendingstracker.app.entity.User;
import com.spendingstracker.app.projection.SpendingsListProjection;
import com.spendingstracker.app.repository.SpendingUserAggrRepository;
import com.spendingstracker.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class SpendingService {
    @Autowired
    private SpendingUserAggrRepository spendingUserAggrRepository;

    @Autowired
    private UserRepository userRepository;

    public Page<SpendingsListProjection> getSpendings(
            long userId, Date startDate, Date endDate, int page, int limit, String groupBy, String type) {
        PageRequest pageRequest = PageRequest.of(page, limit);

        if (type.equals(Constants.REQUEST_TYPES.get(1))) { // Categorical
            return spendingUserAggrRepository.findSpendingsCategorical(userId, startDate, endDate, pageRequest);
        }

        // Numerical
        if (groupBy.equals(Constants.GROUP_BY.get(0))) { // Group by day
            return spendingUserAggrRepository.findSpendingsNumericalGroupByDay(userId, startDate, endDate, pageRequest);
        } else if (groupBy.equals(Constants.GROUP_BY.get(1))) { // Group by week
            return spendingUserAggrRepository.findSpendingsNumericalGroupByWeek(userId, startDate, endDate, pageRequest);
        } else if (groupBy.equals(Constants.GROUP_BY.get(2))) { // Group by month
            return spendingUserAggrRepository.findSpendingsNumericalGroupByMonth(userId, startDate, endDate, pageRequest);
        } else if (groupBy.equals(Constants.GROUP_BY.get(3))) { // Group by year
            return spendingUserAggrRepository.findSpendingsNumericalGroupByYear(userId, startDate, endDate, pageRequest);
        }

        throw new RuntimeException("Could not get spendings!");
    }

    public List<Spending> getSpendingDetails(Date spendingDate, long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UsernameNotFoundException("User not found!"));
        Optional<SpendingUserAggr> spendingUserAggrOpt = spendingUserAggrRepository
                .findSpendingUserAggrByUserAndDate(user, spendingDate);

        return spendingUserAggrOpt
                .map(spendingUserAggr -> new ArrayList<>(spendingUserAggr.getSpendings()))
                .orElse(null);
    }

    public void updateSpending(Set<Spending> spendings, Date spendingDate, long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UsernameNotFoundException("User not found!"));
        SpendingUserAggr spendingUserAggr = spendingUserAggrRepository
                .findSpendingUserAggrByUserAndDate(user, spendingDate)
                .orElseThrow(() -> new IllegalArgumentException("Can't find spendingUserAggr for date: " + spendingDate));

        Set<Spending> spendingsToKeep = spendings
                .stream()
                .filter(spending -> !spending.isDelete())
                .collect(Collectors.toSet());

        spendingUserAggr.emptySpendings(); // Remove all old spendings
        spendingUserAggr.addSpendings(spendingsToKeep); // Readd the spendings to this date
        spendingUserAggrRepository.save(spendingUserAggr);
    }

    public void createSpending(Set<Spending> spendings, Date spendingDate, long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UsernameNotFoundException("User not found!"));
        SpendingUserAggr spendingUserAggr = new SpendingUserAggr(user, spendingDate, spendings);
        user.addSpendingUserAggr(spendingUserAggr); // Add new spending date to the user
        userRepository.save(user); // We save the user (won't create a new user) and all the new spendings will cascade
    }

    public void deleteSpending(long spendingUserAggrId) {
        spendingUserAggrRepository.deleteById(spendingUserAggrId);
    }
}
