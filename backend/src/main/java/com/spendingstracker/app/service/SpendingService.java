package com.spendingstracker.app.service;

import com.spendingstracker.app.model.Spending;
import com.spendingstracker.app.model.SpendingsRequest;
import com.spendingstracker.app.model.SpendingsResponse;
import com.spendingstracker.app.repository.SpendingRepository;
import com.spendingstracker.app.util.CustomMapComparator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class SpendingService {
    @Autowired
    SpendingRepository spendingRepository;

    public SpendingsResponse getSpendings(Integer userId, Date startDate, Date endDate) {
        List<Spending> spendingList;
        if (startDate == null && endDate == null) { // Get all spendings for this user
            spendingList = spendingRepository.findByUserIdOrderByDateAsc(userId);
        } else if (endDate == null) {   // If endDate is null, just go from startDate to present
            spendingList = spendingRepository.findByUserIdAndDateGreaterThanEqualOrderByDateAsc(userId, startDate);
        } else if (startDate == null) {
            spendingList = spendingRepository.findByUserIdAndDateLessThanEqualOrderByDateAsc(userId, endDate);
        } else { // Given both a startDate and endDate
            spendingList = spendingRepository.findByUserIdAndDateBetweenOrderByDateAsc(userId, startDate, endDate);
        }

        // Find the total amount spent of this query and create Map of Date to List<Spending>
        BigDecimal totalSpent = new BigDecimal(0);
        Map<Date, List<Spending>> spendings = new TreeMap<>(new CustomMapComparator());
        for (Spending spending : spendingList) {
            totalSpent = totalSpent.add(spending.getAmount()); // Increment total

            Date spendingDate = spending.getDate();
            spendings.computeIfAbsent(spendingDate, k -> new ArrayList<>());
            spendings.get(spendingDate).add(spending);
        }

        endDate = endDate == null ? new Date() : endDate; // Reassign endDate if null
        return new SpendingsResponse(spendings, startDate, endDate, totalSpent, spendingList.size());
    }

    public void createSpending(Integer userId, SpendingsRequest spendingsRequest) throws Exception {
        validateSpendingsRequestWrapper(spendingsRequest); // Validate the input
        saveSpendings(userId, spendingsRequest, null);
    }

    public void updateSpending(Integer userId, Date date, SpendingsRequest spendingsRequest) throws Exception {
        validateSpendingsRequestWrapper(spendingsRequest); // Validate the input
        deleteSpendings(userId, date, date); // Delete the old spendings
        saveSpendings(userId, spendingsRequest, date); // Update the spendings by inserting them in again with that specific date
    }

    private void deleteSpendings(Integer userId, Date startDate, Date endDate) {
        // Get the spendings associated with this date
        Map<Date, List<Spending>> spendings = getSpendings(userId, startDate, endDate).getSpendings();

        // Convert the map into list of its values
        List<List<Spending>> spendingList = new ArrayList<>(spendings.values());

        // Flatten the list of lists
        List<Spending> flattenedList = spendingList.stream().flatMap(List::stream).collect(Collectors.toList());

        // Delete rows for this user that occur on that date
        spendingRepository.deleteAll(flattenedList);
    }

    private void saveSpendings(Integer userId, SpendingsRequest spendingsRequest, Date date) {
        // Insert the new spendings
        List<String> categories = spendingsRequest.getCategories();
        List<BigDecimal> amounts = spendingsRequest.getAmounts();
        int numberOfSpendings = amounts.size();
        for (int i = 0; i < numberOfSpendings; i++) {
            if (date == null) {
                spendingRepository.save(new Spending(userId, categories.get(i), amounts.get(i)));
            } else {
                spendingRepository.save(new Spending(userId, categories.get(i), amounts.get(i), date));
            }
        }
    }

    private void validateSpendingsRequestWrapper(SpendingsRequest spendingsRequest) throws Exception {
        List<String> categories = spendingsRequest.getCategories();
        List<BigDecimal> amounts = spendingsRequest.getAmounts();

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
