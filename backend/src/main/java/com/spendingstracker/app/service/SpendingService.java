package com.spendingstracker.app.service;

import com.spendingstracker.app.constants.Constants;
import com.spendingstracker.app.model.Spending;
import com.spendingstracker.app.model.SpendingsForADay;
import com.spendingstracker.app.model.SpendingsResponse;
import com.spendingstracker.app.repository.SpendingRepository;
import com.spendingstracker.app.repository.UserRepository;
import com.spendingstracker.app.util.CustomMapComparator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;

@Service
public class SpendingService {
    @Autowired
    private SpendingRepository spendingRepository;

    @Autowired
    private UserRepository userRepository;

    public SpendingsResponse getSpendings(
            Integer userId,
            String currentUri,
            Optional<Date> startDateOpt,
            Optional<Date> endDateOpt,
            Optional<Integer> pageOpt,
            Optional<Integer> limitOpt) {
        Date startDate = startDateOpt.orElse(Constants.LOW_DATE);
        Date endDate = endDateOpt.orElse(Constants.HIGH_DATE);
        Integer page = pageOpt.orElse(Constants.DEFAULT_PAGE);
        Integer limit = limitOpt.orElse(Constants.DEFAULT_LIMIT);

        List<Spending> spendingsList = spendingRepository.findSpendingsBetweenDate(userId, startDate, endDate);

        // Group spendings by date via a Map
        Map<Date, List<Spending>> spendingsDateMap = groupResultsByDate(spendingsList);

        int N = spendingsDateMap.keySet().size();
        int upper = Math.min((page + 1) * limit, N);

        // Custom pagination
        Map<Date, List<Spending>> paginatedSpendingsMap = paginateResults(spendingsDateMap, page, limit, upper);

        // Create custom object which contains spendings grouped by date and some meta data
        List<SpendingsForADay> spendingsForADayList = createSpendingsForADayList(paginatedSpendingsMap);

        String nextPageUri = (upper == N) ? null : formApiUri(currentUri, true, page);
        String prevPageUri = (page == Constants.DEFAULT_PAGE) ? null : formApiUri(currentUri, false, page);
        BigDecimal totalSpent = new BigDecimal(0);
        for (SpendingsForADay spendingsForADay : spendingsForADayList) {
            totalSpent = totalSpent.add(spendingsForADay.getTotal());
        }

        return new SpendingsResponse(
                spendingsForADayList.size(),
                spendingsDateMap.keySet().size(),
                nextPageUri,
                prevPageUri,
                startDate,
                endDate,
                totalSpent,
                spendingsForADayList
        );
    }

    public void saveSpending(List<Spending> spendings) {
        List<Integer> spendingsToDelete = new ArrayList<>();
        List<Spending> spendingsToSave = new ArrayList<>();

        for (Spending spending : spendings) {
            if (spending.getUserId() == null) { // Marked for deletion
                spendingsToDelete.add(spending.getSpendingId());
            } else { // Insert/update spending
                spendingsToSave.add(spending);
            }
        }

        spendingRepository.saveAll(spendingsToSave); // Update spendings that need to be updated
        spendingRepository.deleteAllById(spendingsToDelete); // Delete the spendings that need to be deleted
    }

    private String formApiUri(String currentUri, boolean next, int curPage) {
        // TODO: Error handling
        int newPage = next ? curPage+1 : curPage-1;
        StringBuilder sb = new StringBuilder(currentUri);

        int start = sb.indexOf("page");
        if (start == -1) { // "page" is not in the currentUri
            boolean isOnlyParam = sb.indexOf("?") == -1;

            return sb + (isOnlyParam ? "?" : "&") + "page=" + newPage;
        }

        int end = sb.indexOf("&", start);
        return sb.substring(0, start) + "page=" + newPage + (end == -1 ? "" : sb.substring(end, sb.length()));
    }

    private Map<Date, List<Spending>> groupResultsByDate(List<Spending> spendings) {
        Map<Date, List<Spending>> spendingsDateMap = new TreeMap<>(new CustomMapComparator());
        for (Spending spending : spendings) {
            Date spendingDate = spending.getDate();
            spendingsDateMap.computeIfAbsent(spendingDate, k -> new ArrayList<>()); // Add into the Map if this is the first time this date (key) is seen
            spendingsDateMap.get(spendingDate).add(spending);
        }

        return spendingsDateMap;
    }

    private Map<Date, List<Spending>> paginateResults(Map<Date, List<Spending>> spendingsDateMap, int page, int limit, int upper) {
        List<Date> spendingsKeys = new ArrayList<>(spendingsDateMap.keySet());
        List<Date> paginatedDates = spendingsKeys.subList(page * limit, upper);

        Map<Date, List<Spending>> paginatedSpendingsMap  = new TreeMap<>(new CustomMapComparator());
        for (Date date : paginatedDates) {
            paginatedSpendingsMap.put(date, spendingsDateMap.get(date));
        }

        return paginatedSpendingsMap;
    }

    private List<SpendingsForADay> createSpendingsForADayList(Map<Date, List<Spending>> paginatedSpendingsMap) {
        List<SpendingsForADay> spendingsForADayList = new ArrayList<>();
        paginatedSpendingsMap.forEach(((date, spendings) -> {
            BigDecimal totalForDay = new BigDecimal(0);
            for (Spending spending : spendings) {
                totalForDay = totalForDay.add(spending.getAmount());
            }

            spendingsForADayList.add(new SpendingsForADay(date, spendings.size(), totalForDay, spendings));
        }));

        return spendingsForADayList;
    }
}
