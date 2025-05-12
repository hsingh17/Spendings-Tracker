package com.spendingstracker.app.service;

import com.spendingstracker.app.cache.SpendingCategoryJpaCache;
import com.spendingstracker.app.constants.Granularity;
import com.spendingstracker.app.constants.GraphType;
import com.spendingstracker.app.constants.SpendingCategoryEnum;
import com.spendingstracker.app.dto.requests.GetSpendingsRequestFilters;
import com.spendingstracker.app.dto.response.SpendingPageItemBarChart;
import com.spendingstracker.app.dto.response.SpendingPageItemLineChart;
import com.spendingstracker.app.dto.response.SpendingPageItemPieChart;
import com.spendingstracker.app.dto.response.SpendingPageResponse;
import com.spendingstracker.app.repository.SpendingRepository;
import com.spendingstracker.app.repository.SpendingUserAggrRepositoryImpl;
import com.spendingstracker.app.service.auth.CurrentUserService;
import com.spendingstracker.app.service.spending.SpendingServiceImpl;
import com.spendingstracker.app.service.user.UserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class SpendingServiceTest {
    @Mock
    SpendingRepository spendingRepository;
    @Mock
    SpendingUserAggrRepositoryImpl spendingUserAggrRepository;
    @Mock
    UserServiceImpl userService;
    @Mock
    SpendingCategoryJpaCache spendingCategoryJpaCache;
    @Mock
    CurrentUserService currentUserService;
    @InjectMocks
    SpendingServiceImpl spendingService;

    @BeforeEach
    public void init() {
        when(currentUserService.getCurrentUserId()).thenReturn(BigInteger.ONE);
    }

    @Test
    public void shouldGetLineSpendings() {
        int N = 10;
        int pageNum = 0;
        int pageLimit = 10;

        GetSpendingsRequestFilters filters =
                new GetSpendingsRequestFilters(
                        LocalDate.now(),
                        LocalDate.now(),
                        Granularity.DAY,
                        GraphType.LINE,
                        pageNum,
                        pageLimit);

        List<SpendingPageItemLineChart> list = new ArrayList<>();
        for (int i = 0; i < N; i++) {
            list.add(
                    new SpendingPageItemLineChart(
                            BigInteger.ONE.add(BigInteger.valueOf(i)),
                            LocalDate.now(),
                            BigDecimal.TEN.multiply(BigDecimal.valueOf(i))));
        }

        Page<SpendingPageItemLineChart> page =
                new PageImpl<>(list, PageRequest.of(pageNum, pageLimit), list.size());

        when(spendingUserAggrRepository.findSpendingsForLineChart(
                any(BigInteger.class),
                any(LocalDate.class),
                any(LocalDate.class),
                any(Granularity.class),
                any(Pageable.class)))
                .thenReturn(page);

        SpendingPageResponse response = spendingService.getSpendings(filters);

        assertEquals(response.spendingPage().getTotalElements(), N);

        verify(spendingUserAggrRepository, times(1))
                .findSpendingsForLineChart(
                        any(BigInteger.class),
                        any(LocalDate.class),
                        any(LocalDate.class),
                        any(Granularity.class),
                        any(Pageable.class));

        verify(spendingUserAggrRepository, never())
                .findSpendingsForBarChart(
                        any(BigInteger.class),
                        any(LocalDate.class),
                        any(LocalDate.class),
                        any(Granularity.class),
                        any(Pageable.class));

        verify(spendingUserAggrRepository, never())
                .findSpendingsForPieChart(
                        any(BigInteger.class),
                        any(LocalDate.class),
                        any(LocalDate.class),
                        any(Pageable.class));
    }

    @Test
    public void shouldGetBarSpendings() {
        int N = 10;
        int pageNum = 0;
        int pageLimit = 10;

        GetSpendingsRequestFilters filters =
                new GetSpendingsRequestFilters(
                        LocalDate.now(),
                        LocalDate.now(),
                        Granularity.DAY,
                        GraphType.BAR,
                        pageNum,
                        pageLimit);

        List<SpendingPageItemBarChart> list = new ArrayList<>();
        for (int i = 0; i < N; i++) {
            list.add(
                    new SpendingPageItemBarChart(
                            LocalDate.now(),
                            BigDecimal.TEN.multiply(BigDecimal.valueOf(i)),
                            null));
        }

        Page<SpendingPageItemBarChart> page =
                new PageImpl<>(list, PageRequest.of(pageNum, pageLimit), list.size());

        when(spendingUserAggrRepository.findSpendingsForBarChart(
                any(BigInteger.class),
                any(LocalDate.class),
                any(LocalDate.class),
                any(Granularity.class),
                any(Pageable.class)))
                .thenReturn(page);

        SpendingPageResponse response = spendingService.getSpendings(filters);

        assertEquals(response.spendingPage().getTotalElements(), N);

        verify(spendingUserAggrRepository, never())
                .findSpendingsForLineChart(
                        any(BigInteger.class),
                        any(LocalDate.class),
                        any(LocalDate.class),
                        any(Granularity.class),
                        any(Pageable.class));

        verify(spendingUserAggrRepository, times(1))
                .findSpendingsForBarChart(
                        any(BigInteger.class),
                        any(LocalDate.class),
                        any(LocalDate.class),
                        any(Granularity.class),
                        any(Pageable.class));

        verify(spendingUserAggrRepository, never())
                .findSpendingsForPieChart(
                        any(BigInteger.class),
                        any(LocalDate.class),
                        any(LocalDate.class),
                        any(Pageable.class));
    }


    @Test
    public void shouldGetPieSpendings() {
        int N = 10;
        int pageNum = 0;
        int pageLimit = 10;

        GetSpendingsRequestFilters filters =
                new GetSpendingsRequestFilters(
                        LocalDate.now(),
                        LocalDate.now(),
                        Granularity.DAY,
                        GraphType.PIE,
                        pageNum,
                        pageLimit);

        List<SpendingPageItemPieChart> list = new ArrayList<>();
        for (int i = 0; i < N; i++) {
            list.add(
                    new SpendingPageItemPieChart(
                            SpendingCategoryEnum.OTHER.getStringDecode(),
                            BigDecimal.TEN.multiply(BigDecimal.valueOf(i))));
        }

        Page<SpendingPageItemPieChart> page =
                new PageImpl<>(list, PageRequest.of(pageNum, pageLimit), list.size());

        when(spendingUserAggrRepository.findSpendingsForPieChart(
                any(BigInteger.class),
                any(LocalDate.class),
                any(LocalDate.class),
                any(Pageable.class)))
                .thenReturn(page);

        SpendingPageResponse response = spendingService.getSpendings(filters);

        assertEquals(response.spendingPage().getTotalElements(), N);

        verify(spendingUserAggrRepository, never())
                .findSpendingsForLineChart(
                        any(BigInteger.class),
                        any(LocalDate.class),
                        any(LocalDate.class),
                        any(Granularity.class),
                        any(Pageable.class));

        verify(spendingUserAggrRepository, never())
                .findSpendingsForBarChart(
                        any(BigInteger.class),
                        any(LocalDate.class),
                        any(LocalDate.class),
                        any(Granularity.class),
                        any(Pageable.class));

        verify(spendingUserAggrRepository, times(1))
                .findSpendingsForPieChart(
                        any(BigInteger.class),
                        any(LocalDate.class),
                        any(LocalDate.class),
                        any(Pageable.class));
    }
}
