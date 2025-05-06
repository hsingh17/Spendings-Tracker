package com.spendingstracker.app.service;

import com.spendingstracker.app.cache.SpendingCategoryJpaCache;
import com.spendingstracker.app.repository.SpendingRepository;
import com.spendingstracker.app.repository.SpendingUserAggrRepository;
import com.spendingstracker.app.service.auth.CurrentUserService;
import com.spendingstracker.app.service.spending.SpendingService;
import com.spendingstracker.app.service.user.UserService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class SpendingServiceTest {
    @InjectMocks SpendingService spendingService;
    @Mock SpendingRepository spendingRepository;
    @Mock SpendingUserAggrRepository spendingUserAggrRepository;
    @Mock UserService userService;
    @Mock SpendingCategoryJpaCache spendingCategoryJpaCache;
    @Mock CurrentUserService currentUserService;

    @BeforeEach
    public void init() {
        MockitoAnnotations.openMocks(this);
    }
}
