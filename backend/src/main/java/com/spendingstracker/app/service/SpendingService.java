package com.spendingstracker.app.service;

import com.spendingstracker.app.model.Spending;
import com.spendingstracker.app.model.SpendingUserAggr;
import com.spendingstracker.app.model.User;
import com.spendingstracker.app.repository.SpendingRepository;
import com.spendingstracker.app.repository.SpendingUserAggrRepository;
import com.spendingstracker.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class SpendingService {
    @Autowired
    private SpendingUserAggrRepository spendingUserAggrRepository;

    @Autowired
    private SpendingRepository spendingRepository;

    @Autowired
    private UserRepository userRepository;

    public Page<SpendingUserAggr> getSpendings(Long userId, Date startDate, Date endDate, Integer page, Integer limit) {
        return spendingUserAggrRepository.findSpendingsBetweenDate(userId, startDate, endDate, PageRequest.of(page, limit));
    }

    public void saveSpending(Long userId, Set<Spending> spendings, Date spendingDate) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
        SpendingUserAggr spendingUserAggr = spendingUserAggrRepository
                .findSpendingUserAggrByUserAndDate(user, spendingDate)
                .orElse(null); // Check if this spending already exists for this user

        if (spendingUserAggr != null) { // Existing spending
            updateExistingSpendings(spendings, spendingUserAggr);
        } else { // New spending
            saveNewSpending(user, spendings, spendingDate);
        }
    }

    private void updateExistingSpendings(Set<Spending> spendings, SpendingUserAggr spendingUserAggr) {
        Set<Spending> spendingsToKeep = spendings
                .stream()
                .filter(spending -> !spending.isDelete())
                .collect(Collectors.toSet());

        spendingUserAggr.emptySpendings();
        spendingUserAggr.addSpendings(spendingsToKeep);
        spendingUserAggrRepository.save(spendingUserAggr);
    }

    private void saveNewSpending(User user, Set<Spending> spendings, Date spendingDate) {
        SpendingUserAggr spendingUserAggr = new SpendingUserAggr(user, spendingDate, spendings);

        user.addSpendingUserAggr(spendingUserAggr); // Add new spending date to the user
        userRepository.save(user); // We save the user (won't create a new user) and all the new spendings will cascade
    }

    public void deleteSpendingByDate(Long userId, Date spendingDate) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
        SpendingUserAggr spendingUserAggr = spendingUserAggrRepository
                .findSpendingUserAggrByUserAndDate(user, spendingDate)
                .orElse(null); // Check if this spending already exists for this user

        if (spendingUserAggr == null) {
            // TODO:
            return;
        }

        user.removeSpendingUserAggr(spendingUserAggr);
        userRepository.save(user);
    }
}
