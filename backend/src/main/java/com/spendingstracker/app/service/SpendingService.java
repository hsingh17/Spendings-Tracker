package com.spendingstracker.app.service;

import com.spendingstracker.app.constants.Constants;
import com.spendingstracker.app.model.Spending;
import com.spendingstracker.app.model.SpendingsResponse;
import com.spendingstracker.app.repository.SpendingRepository;
import com.spendingstracker.app.util.CustomMapComparator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;

@Service
public class SpendingService {
    @Autowired
    private SpendingRepository spendingRepository;

    public SpendingsResponse getSpendings(Integer userId, Date startDate, Date endDate) {
        startDate = (startDate == null) ? Constants.LOW_DATE : startDate; // If start date is null, default to LOW_DATE
        endDate = (endDate == null) ? Constants.HIGH_DATE : endDate; // If end date is null, default to HIGH_DATE

        List<Spending> spendingList = spendingRepository.findSpendingsBetweenDate(userId, startDate, endDate);
        BigDecimal totalSpent = new BigDecimal(0);
        Map<Date, List<Spending>> spendings = new TreeMap<>(new CustomMapComparator());

        for (Spending spending : spendingList) {
            totalSpent = totalSpent.add(spending.getAmount()); // Increment total

            Date spendingDate = spending.getDate();
            spendings.computeIfAbsent(spendingDate, k -> new ArrayList<>()); // Add into the Map if this is the first time this date (key) is seen
            spendings.get(spendingDate).add(spending);
        }

        return new SpendingsResponse(spendings, startDate, endDate, totalSpent, spendingList.size());
    }

    public void createSpending(List<Spending> spendings) throws Exception {
        spendingRepository.saveAll(spendings);
    }

    public void updateSpending(List<Spending> spendings) throws Exception {
        spendingRepository.saveAll(spendings);
    }
}
