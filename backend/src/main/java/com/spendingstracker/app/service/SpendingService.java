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
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
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

    public Page<SpendingUserAggr> getSpendings(long userId, Date startDate, Date endDate, int page, int limit) {
        Page<SpendingUserAggr> spendingUserAggrPage = spendingUserAggrRepository.findSpendingsBetweenDate(
                userId,
                startDate,
                endDate,
                PageRequest.of(page, limit)
        );

        spendingUserAggrPage.forEach(spendingUserAggr -> {
            BigDecimal total = BigDecimal.ZERO;
            for (Spending spending : spendingUserAggr.getSpendings()) {
                total = total.add(spending.getAmount());
            }
            spendingUserAggr.setTotal(total);
        });

        return spendingUserAggrPage;
    }

    public void saveSpending(Long userId, Set<Spending> spendings, Date spendingDate) throws UsernameNotFoundException {
        User user = userRepository.findById(userId).orElseThrow(() -> new UsernameNotFoundException("User not found!"));
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

    public void deleteSpendingByDate(long userId, Date spendingDate) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UsernameNotFoundException("User not found!"));
        SpendingUserAggr spendingUserAggr = spendingUserAggrRepository
                .findSpendingUserAggrByUserAndDate(user, spendingDate)
                .orElse(null); // Check if this spending already exists for this user

        if (spendingUserAggr == null) {
            throw new IllegalArgumentException("No spendings found for this date!");
        }

        user.removeSpendingUserAggr(spendingUserAggr);
        userRepository.save(user);
    }
}
