package com.spendingstracker.app.service;

import com.spendingstracker.app.constants.Constants;
import com.spendingstracker.app.model.Spending;
import com.spendingstracker.app.model.SpendingsResponse;
import com.spendingstracker.app.repository.SpendingRepository;
import com.spendingstracker.app.util.CustomMapComparator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;

@Service
public class SpendingService {
    @Autowired
    private SpendingRepository spendingRepository;

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

        Page<Spending> spendingPage = spendingRepository.findSpendingsBetweenDate(
                userId, startDate, endDate, PageRequest.of(page, limit));

        BigDecimal totalSpent = new BigDecimal(0);
        Map<Date, List<Spending>> spendings = new TreeMap<>(new CustomMapComparator());

        for (Spending spending : spendingPage) {
            totalSpent = totalSpent.add(spending.getAmount()); // Increment total

            Date spendingDate = spending.getDate();
            spendings.computeIfAbsent(spendingDate, k -> new ArrayList<>()); // Add into the Map if this is the first time this date (key) is seen
            spendings.get(spendingDate).add(spending);
        }

        String nextPageUri = (page >= spendingPage.getTotalPages()-1) ? null : formApiUri(currentUri, true, page);
        String prevPageUri = (page == Constants.DEFAULT_PAGE) ? null : formApiUri(currentUri, false, page);

        return new SpendingsResponse(spendings, startDate, endDate, totalSpent, spendingPage.getTotalElements(), nextPageUri, prevPageUri);
    }

    public void createSpending(List<Spending> spendings) throws Exception {
        spendingRepository.saveAll(spendings);
    }

    public void updateSpending(List<Spending> spendings) throws Exception {
        spendingRepository.saveAll(spendings);
    }

    private String formApiUri(String currentUri, boolean next, int curPage) {
        // TODO: Error handling
        StringBuilder sb = new StringBuilder(currentUri);
        int start = sb.indexOf("page");
        int end = sb.indexOf("&", start);
        int newPage = next ? curPage+1 : curPage-1;

        return sb.substring(0, start) + "page=" + newPage + (end == -1 ? "" : sb.substring(end, sb.length()));
    }
}
