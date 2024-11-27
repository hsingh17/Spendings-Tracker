package com.spendingstracker.app.service.auth;

import com.spendingstracker.app.dto.CustomUserDetails;
import com.spendingstracker.app.entity.User;
import com.spendingstracker.app.exception.NoAuthenticatedUserException;
import com.spendingstracker.app.service.user.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigInteger;

@Slf4j
@Service
@RequiredArgsConstructor
public class CurrentUserServiceImpl implements CurrentUserService {
    private final UserService userService;

    @Override
    public BigInteger getCurrentUserId() {
        CustomUserDetails userDetails = getCurrentUserDetails();
        return userDetails.getUserId();
    }

    @Override
    public CustomUserDetails getCurrentUserDetails() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            String errMsg = "No authenticated user in the context!";
            log.error(errMsg);
            throw new NoAuthenticatedUserException(errMsg);
        }

        return (CustomUserDetails) auth.getPrincipal();
    }

    @Override
    public User getUserJpaEntity() {
        return userService.getUserById(getCurrentUserId());
    }
}
