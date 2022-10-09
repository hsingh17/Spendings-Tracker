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
        List<Spending> spendings;
        if (startDate == null && endDate == null) { // Get all spendings for this user
            spendings = spendingRepository.findByUserIdOrderByDateAsc(userId);
        } else if (endDate == null) {   // If endDate is null, just go from startDate to present
            spendings = spendingRepository.findByUserIdAndDateGreaterThanEqualOrderByDateAsc(userId, startDate);
        } else if (startDate == null) {
            spendings = spendingRepository.findByUserIdAndDateLessThanEqualOrderByDateAsc(userId, endDate);
        } else { // Given both a startDate and endDate
            spendings = spendingRepository.findByUserIdAndDateBetweenOrderByDateAsc(userId, startDate, endDate);
        }
        double totalSpent = spendings.stream().mapToDouble(Spending::getAmount).sum();
        endDate = endDate == null ? new Date() : endDate; // Reassign endDate if null
        return new SpendingsResponseWrapper(spendings, startDate, endDate, totalSpent);
    }

    public void createSpending(Integer userId, SpendingsRequestWrapper spendingsRequestWrapper, boolean inputValidated) throws Exception {
        if (!inputValidated) {
            validateSpendingsRequestWrapper(spendingsRequestWrapper); // Validate the input
        }

        List<String> categories = spendingsRequestWrapper.getCategories();
        List<Double> amounts = spendingsRequestWrapper.getAmounts();
        int numberOfSpendings = categories.size();
        // Create and save a new Spending object to the DB for each spending sent by the Request
        for (int i = 0; i < numberOfSpendings; i++) {
            spendingRepository.save(new Spending(userId, categories.get(i), amounts.get(i)));
        }
    }

    public void updateSpending(Integer userId, Date date, SpendingsRequestWrapper spendingsRequestWrapper) throws Exception {
        validateSpendingsRequestWrapper(spendingsRequestWrapper); // Validate the input

        // Get the spendings associated with this date
        List<Spending> spendingsToDelete = getSpendings(userId, date, date).getSpendings();

        // Delete rows for this user that occur on that date
        spendingRepository.deleteAll(spendingsToDelete);

        // Insert the new spendings for that day
        List<String> categories = spendingsRequestWrapper.getCategories();
        List<Double> amounts = spendingsRequestWrapper.getAmounts();
        int numberOfSpendings = amounts.size();
        for (int i = 0; i < numberOfSpendings; i++) {
            spendingRepository.save(new Spending(userId, categories.get(i), amounts.get(i), date));
        }
    }

    private void validateSpendingsRequestWrapper(SpendingsRequestWrapper spendingsRequestWrapper) throws Exception {
        List<String> categories = spendingsRequestWrapper.getCategories();
        List<Double> amounts = spendingsRequestWrapper.getAmounts();

        boolean isCategoriesNull = categories == null;
        boolean isAmountsNull = amounts == null;
        if (isCategoriesNull || isAmountsNull) { // One of the lists was not passed
            String message = isCategoriesNull ? "The categories can not be null!" : "The amounts can not be null!";
            throw new IllegalArgumentException(message);

        }

        int numberOfCategories = categories.size();
        int numberOfAmounts = amounts.size();
        if (numberOfAmounts != numberOfCategories) { // More amounts than categories or vice-versa
            throw new IllegalArgumentException("The number of amounts entered and categories entered is not equal!");
        }

        // Check to see if any passed in category is empty
        boolean anyEmptyCategory = categories.stream().anyMatch(String::isEmpty);
        if (anyEmptyCategory) {
            throw new IllegalArgumentException("Categories can not be empty!");
        }
    }
}
