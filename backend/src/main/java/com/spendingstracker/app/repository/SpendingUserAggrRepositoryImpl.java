package com.spendingstracker.app.repository;

import com.spendingstracker.app.constants.Granularity;
import com.spendingstracker.app.dto.response.SpendingPageItem;
import com.spendingstracker.app.entity.SpendingUserAggr;
import com.spendingstracker.app.entity.User;
import com.spendingstracker.app.projection.SpendingProjection;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Repository
/**
 * Implementation of the <code>SpendingUserAggrRepository</code> interface
 *
 * @see SpendingUserAggrRepository
 */
public class SpendingUserAggrRepositoryImpl implements SpendingUserAggrRepository {
    private final SpendingUserAggrJpaRepository spendingUserAggrJpaRepository;
    private final SpendingUserAggrJdbcRepository spendingUserAggrJdbcRepository;

    public SpendingUserAggrRepositoryImpl(
            SpendingUserAggrJpaRepository spendingUserAggrJpaRepository,
            SpendingUserAggrJdbcRepository spendingUserAggrJdbcRepository) {
        this.spendingUserAggrJpaRepository = spendingUserAggrJpaRepository;
        this.spendingUserAggrJdbcRepository = spendingUserAggrJdbcRepository;
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
    public Page<SpendingPageItem> findSpendingsForLineChart(
            BigInteger userId,
            LocalDate startDate,
            LocalDate endDate,
            Granularity granularity,
            Pageable pageable) {
        //        Page<SpendingListProjection> spendingsListProjs =
        //                spendingUserJdbcRepository.findSpendingsNumericalGroupBy(
        //                        userId, startDate, endDate, granularity, pageable);
        return null;
    }

    @Override
    public Page<SpendingPageItem> findSpendingsForPieChart(
            BigInteger userId, LocalDate startDate, LocalDate endDate, Pageable pageable) {
        //        return spendingUserJdbcRepository.findSpendingsCategorical(
        //                userId, startDate, endDate, pageable);
        return null;
    }

    @Override
    public Page<SpendingPageItem> findSpendingsForBarChart(
            BigInteger userId,
            LocalDate startDate,
            LocalDate endDate,
            Granularity granularity,
            Pageable pageable) {
        return null;
    }

    private <T> Page<SpendingPageItem> makeSpendingPageItem(
            Page<T> page, Pageable pageable, SpendingPageItemInitFunc<T> initFunc) {
        // No spendings
        if (!page.hasContent()) {
            return new PageImpl<>(Collections.emptyList(), pageable, 0);
        }

        List<SpendingPageItem> spendingPageItemList = new ArrayList<>();

        for (T pageItem : page) {
            spendingPageItemList.add(initFunc.constructSpendingPageItem(pageItem));
        }

        return new PageImpl<>(spendingPageItemList, pageable, page.getTotalElements());
    }

    /**
     * Creates a <code>SpendingPageItem</code> object.
     *
     * @see SpendingPageItem
     */
    @FunctionalInterface
    private interface SpendingPageItemInitFunc<T> {
        SpendingPageItem constructSpendingPageItem(T pageItem);
    }
}
