package com.spendingstracker.app.service;

import static com.spendingstracker.app.constants.SpendingCategoryEnum.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.spendingstracker.app.cache.SpendingCategoryJpaCache;
import com.spendingstracker.app.constants.Granularity;
import com.spendingstracker.app.constants.GraphType;
import com.spendingstracker.app.constants.SpendingCategoryEnum;
import com.spendingstracker.app.dto.requests.GetSpendingsRequestFilters;
import com.spendingstracker.app.dto.requests.SpendingRequest;
import com.spendingstracker.app.dto.requests.SpendingsSaveRequest;
import com.spendingstracker.app.dto.response.*;
import com.spendingstracker.app.entity.Spending;
import com.spendingstracker.app.entity.SpendingCategory;
import com.spendingstracker.app.entity.SpendingUserAggr;
import com.spendingstracker.app.entity.User;
import com.spendingstracker.app.projection.SpendingProjection;
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
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
public class SpendingServiceTest {
    @Mock SpendingRepository spendingRepository;
    @Mock SpendingUserAggrRepositoryImpl spendingUserAggrRepository;
    @Mock UserServiceImpl userService;
    @Mock SpendingCategoryJpaCache spendingCategoryJpaCache;
    @Mock CurrentUserService currentUserService;
    @InjectMocks SpendingServiceImpl spendingService;

    @BeforeEach
    public void initMockEach() {
        when(currentUserService.getCurrentUserId()).thenReturn(BigInteger.ONE);
    }

    private User initUserMocks() {
        User user = new User("foo-bar", "foo@bar.com", "foobar");
        user.setUserId(BigInteger.ONE);
        when(userService.getUserById(any(BigInteger.class))).thenReturn(user);
        return user;
    }

    private User initUpdateMocks() {
        when(spendingCategoryJpaCache.getFromCache(TRANSPORATION))
                .thenReturn(new SpendingCategory(TRANSPORATION));
        when(spendingCategoryJpaCache.getFromCache(CLOTHING))
                .thenReturn(new SpendingCategory(CLOTHING));
        when(spendingCategoryJpaCache.getFromCache(VEHICLE))
                .thenReturn(new SpendingCategory(VEHICLE));
        when(spendingCategoryJpaCache.getFromCache(TRAVEL))
                .thenReturn(new SpendingCategory(TRAVEL));
        when(spendingCategoryJpaCache.getFromCache(HEALTH))
                .thenReturn(new SpendingCategory(HEALTH));
        when(spendingCategoryJpaCache.getFromCache(FOOD)).thenReturn(new SpendingCategory(FOOD));
        when(spendingCategoryJpaCache.getFromCache(PET)).thenReturn(new SpendingCategory(PET));
        when(spendingCategoryJpaCache.getFromCache(ENTERTAINMENT))
                .thenReturn(new SpendingCategory(ENTERTAINMENT));
        when(spendingCategoryJpaCache.getFromCache(UTILITY))
                .thenReturn(new SpendingCategory(UTILITY));
        when(spendingCategoryJpaCache.getFromCache(SUBSCRIPTION))
                .thenReturn(new SpendingCategory(SUBSCRIPTION));

        return initUserMocks();
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
                            LocalDate.now(), BigDecimal.TEN.multiply(BigDecimal.valueOf(i)), null));
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

    @Test
    public void shouldFindNoDetails() {
        when(spendingUserAggrRepository.findSpendingDetailsByUserIdAndDate(
                        any(LocalDate.class), any(BigInteger.class)))
                .thenReturn(Collections.emptyList());

        SpendingDetailsResponse response = spendingService.getSpendingDetails(LocalDate.now());

        assertEquals(0, response.spendings().size());
        verify(spendingUserAggrRepository, times(1))
                .findSpendingDetailsByUserIdAndDate(any(LocalDate.class), any(BigInteger.class));
    }

    @Test
    public void shouldFindDetails() {
        SpendingCategoryEnum[] enums = SpendingCategoryEnum.values();
        List<SpendingProjection> list = new ArrayList<>();
        int N = 20;
        for (int i = 0; i < N; i++) {
            final int iCopy = i;
            list.add(
                    new SpendingProjection() {
                        @Override
                        public BigInteger getSpendingId() {
                            return BigInteger.ONE;
                        }

                        @Override
                        public String getCategory() {
                            return enums[iCopy % enums.length].getStringDecode();
                        }

                        @Override
                        public BigDecimal getAmount() {
                            return BigDecimal.TEN.multiply(BigDecimal.valueOf(iCopy));
                        }

                        @Override
                        public String getMemo() {
                            return "";
                        }
                    });
        }

        when(spendingUserAggrRepository.findSpendingDetailsByUserIdAndDate(
                        any(LocalDate.class), any(BigInteger.class)))
                .thenReturn(list);

        SpendingDetailsResponse response = spendingService.getSpendingDetails(LocalDate.now());

        assertEquals(N, response.spendings().size());
        verify(spendingUserAggrRepository, times(1))
                .findSpendingDetailsByUserIdAndDate(any(LocalDate.class), any(BigInteger.class));
    }

    @Test
    public void shouldCreateSpending() {
        initUpdateMocks();

        SpendingCategoryEnum[] enums = SpendingCategoryEnum.values();
        List<SpendingRequest> requests = new ArrayList<>();
        int N = 10;

        for (int i = 0; i < N; i++) {
            requests.add(
                    new SpendingRequest(
                            null,
                            enums[i % N],
                            BigDecimal.TEN.multiply(BigDecimal.valueOf(i)),
                            "memo",
                            false));
        }

        assertDoesNotThrow(
                () ->
                        spendingService.createSpending(
                                new SpendingsSaveRequest(requests), LocalDate.now()));

        verify(spendingUserAggrRepository, times(1)).save(any(SpendingUserAggr.class));
        verify(spendingCategoryJpaCache, times(N)).getFromCache(any(SpendingCategoryEnum.class));
    }

    @Test
    public void shouldThrowIllegalArgumentExceptionWhileUpdating() {
        initUserMocks();
        when(spendingUserAggrRepository.findSpendingUserAggrByUserAndDate(
                        any(User.class), any(LocalDate.class)))
                .thenReturn(Optional.empty());

        assertThrows(
                IllegalArgumentException.class,
                () ->
                        spendingService.updateSpending(
                                new SpendingsSaveRequest(Collections.emptyList()),
                                LocalDate.now()));
    }

    @Test
    public void shouldUpdateSpending() {
        User user = initUpdateMocks();
        List<Spending> spendings = new ArrayList<>();
        List<SpendingRequest> requests = new ArrayList<>();
        SpendingCategoryEnum[] enums = SpendingCategoryEnum.values();
        int N = 10;

        for (int i = 0; i < N; i++) {
            spendings.add(
                    new Spending(
                            new SpendingCategory(enums[i % N]),
                            BigDecimal.TEN.multiply(BigDecimal.valueOf(i)),
                            "foo"));

            requests.add(
                    new SpendingRequest(
                            null,
                            enums[i % N],
                            BigDecimal.TEN.multiply(BigDecimal.valueOf(i)),
                            "memo",
                            false));
        }

        Optional<SpendingUserAggr> opt =
                Optional.of(new SpendingUserAggr(user, LocalDate.now(), spendings));

        when(spendingUserAggrRepository.findSpendingUserAggrByUserAndDate(
                        any(User.class), any(LocalDate.class)))
                .thenReturn(opt);

        spendingService.updateSpending(new SpendingsSaveRequest(requests), LocalDate.now());

        verify(spendingUserAggrRepository, times(1))
                .findSpendingUserAggrByUserAndDate(any(User.class), any(LocalDate.class));

        verify(spendingUserAggrRepository, times(1)).save(any(SpendingUserAggr.class));

        verify(spendingCategoryJpaCache, times(N)).getFromCache(any(SpendingCategoryEnum.class));
    }
}
