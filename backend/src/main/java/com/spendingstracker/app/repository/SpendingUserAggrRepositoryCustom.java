package com.spendingstracker.app.repository;

import com.spendingstracker.app.projection.SpendingsListProjection;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface SpendingUserAggrRepositoryCustom {
    Page<SpendingsListProjection> findSpendingsNumericalGroupBy(
            long userId, LocalDate startDate, LocalDate endDate, Pageable pageable);
}
