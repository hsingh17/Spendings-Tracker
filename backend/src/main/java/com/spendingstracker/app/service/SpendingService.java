package com.spendingstracker.app.service;

import com.spendingstracker.app.constants.Granularity;
import com.spendingstracker.app.constants.GraphType;
import com.spendingstracker.app.entity.Spending;
import com.spendingstracker.app.projection.SpendingsListProjection;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Service
public interface SpendingService {
    Page<SpendingsListProjection> getSpendings(
            long userId,
            LocalDate startDate,
            LocalDate endDate,
            int page,
            int limit,
            Granularity granularity,
            GraphType type);

    List<Spending> getSpendingDetails(LocalDate spendingDate, long userId);

    void updateSpending(Set<Spending> spendings, LocalDate spendingDate, long userId);

    void createSpending(Set<Spending> spendings, LocalDate spendingDate, long userId);

    void deleteSpending(long spendingUserAggrId);
}
