package com.spendingstracker.app.service;

import com.spendingstracker.app.model.Spending;
import com.spendingstracker.app.model.SpendingsRequestWrapper;
import com.spendingstracker.app.model.SpendingsResponseWrapper;
import com.spendingstracker.app.repository.SpendingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class SpendingService {
    @Autowired
    SpendingRepository spendingRepository;

    public SpendingsResponseWrapper getSpendings(Integer userId, Date startDate, Date endDate) {
        List<Spending> spendings = null;
        if (startDate == null && endDate == null) { // Get all spendings for this user
            spendings = spendingRepository.findByUserIdOrderByDateAsc(userId);
        } else if (endDate == null) {   // If endDate is null, just go from startDate to present
            spendings = spendingRepository.findByUserIdAndDateGreaterThanEqualOrderByDateAsc(userId, startDate);
        } else if (startDate == null) {
            // TODO: Not sure what to put here.
        } else { // Given both a startDate and endDate
            spendings = spendingRepository.findByUserIdAndDateBetweenOrderByDateAsc(userId, startDate, endDate);
        }
        double totalSpent = spendings.stream().mapToDouble(Spending::getAmount).sum();
        return new SpendingsResponseWrapper(spendings, startDate, endDate, totalSpent);
    }

    public void createSpending(Integer userId, SpendingsRequestWrapper spendingsRequestWrapper) {
        List<String> categories = spendingsRequestWrapper.getCategories();
        List<Double> amounts = spendingsRequestWrapper.getAmounts();
        int numberOfSpendings = amounts.size();

        // Create and save a new Spending object to the DB for each spending sent by the Request
        for (int i = 0; i < numberOfSpendings; i++) {
            spendingRepository.save(new Spending(userId, categories.get(i), amounts.get(i)));
        }
    }
}
