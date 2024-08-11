package com.spendingstracker.app.repository;

import com.spendingstracker.app.constants.Granularity;
import com.spendingstracker.app.entity.SpendingUserAggr;
import com.spendingstracker.app.entity.User;
import com.spendingstracker.app.projection.SpendingListProjection;
import com.spendingstracker.app.projection.SpendingProjection;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public class SpendingUserAggrRepositoryImpl implements SpendingUserAggrRepository {
    private final SpendingUserAggrJpaRepository spendingUserAggrJpaRepository;
    private final SpendingUserJdbcRepository spendingUserJdbcRepository;

    public SpendingUserAggrRepositoryImpl(
            SpendingUserAggrJpaRepository spendingUserAggrJpaRepository,
            SpendingUserJdbcRepository spendingUserJdbcRepository) {
        this.spendingUserAggrJpaRepository = spendingUserAggrJpaRepository;
        this.spendingUserJdbcRepository = spendingUserJdbcRepository;
    }

    @Override
    public Optional<SpendingUserAggr> findSpendingUserAggrByUserAndDate(User user, LocalDate date) {
        return spendingUserAggrJpaRepository.findSpendingUserAggrByUserAndDate(user, date);
    }

    @Override
    public List<SpendingProjection> findSpendingDetailsByUserIdAndDate(
            LocalDate date, BigInteger userId) {
        return spendingUserAggrJpaRepository.findSpendingDetailsByUserIdAndDate(date, userId);
    }

    @Override
    public SpendingUserAggr save(SpendingUserAggr spendingUserAggr) {
        return spendingUserAggrJpaRepository.save(spendingUserAggr);
    }

    @Override
    public void deleteById(BigInteger spendingUserAggrId) {
        spendingUserAggrJpaRepository.deleteById(spendingUserAggrId);
    }

    @Override
    public Page<SpendingListProjection> findSpendingsNumericalGroupBy(
            BigInteger userId,
            LocalDate startDate,
            LocalDate endDate,
            Granularity granularity,
            Pageable pageable) {
        return spendingUserJdbcRepository.findSpendingsNumericalGroupBy(
                userId, startDate, endDate, granularity, pageable);
    }

    @Override
    public Page<SpendingListProjection> findSpendingsCategorical(
            BigInteger userId, LocalDate startDate, LocalDate endDate, Pageable pageable) {
        return spendingUserJdbcRepository.findSpendingsCategorical(
                userId, startDate, endDate, pageable);
    }
}
