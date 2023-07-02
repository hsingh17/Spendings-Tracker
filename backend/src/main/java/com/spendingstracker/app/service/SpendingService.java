package com.spendingstracker.app.service;

import com.spendingstracker.app.entity.Spending;
import com.spendingstracker.app.entity.SpendingUserAggr;
import com.spendingstracker.app.entity.User;
import com.spendingstracker.app.projection.SpendingsListProjection;
import com.spendingstracker.app.repository.SpendingRepository;
import com.spendingstracker.app.repository.SpendingUserAggrRepository;
import com.spendingstracker.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class SpendingService {
    @Autowired
    private SpendingUserAggrRepository spendingUserAggrRepository;

    @Autowired
    private SpendingRepository spendingRepository;

    @Autowired
    private UserRepository userRepository;

    public Page<SpendingsListProjection> getSpendings(long userId, Date startDate, Date endDate, int page, int limit) {
        return spendingUserAggrRepository.findSpendingsBetweenDate(
                userId,
                startDate,
                endDate,
                PageRequest.of(page, limit)
        );
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
