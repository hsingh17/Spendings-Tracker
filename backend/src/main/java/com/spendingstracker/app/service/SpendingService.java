package com.spendingstracker.app.service;

import com.spendingstracker.app.constants.GroupBy;
import com.spendingstracker.app.constants.SpendingType;
import com.spendingstracker.app.entity.Spending;
import com.spendingstracker.app.projection.SpendingsListProjection;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Service
public interface SpendingService {
    Page<SpendingsListProjection> getSpendings(
            long userId,
            Date startDate,
            Date endDate,
            int page,
            int limit,
            GroupBy groupBy,
            SpendingType type);

    List<Spending> getSpendingDetails(Date spendingDate, long userId);

    void updateSpending(Set<Spending> spendings, Date spendingDate, long userId);

    void createSpending(Set<Spending> spendings, Date spendingDate, long userId);

    void deleteSpending(long spendingUserAggrId);
}
