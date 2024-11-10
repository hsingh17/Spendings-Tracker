package com.spendingstracker.app.service.auth;

import com.spendingstracker.app.dto.CustomUserDetails;
import com.spendingstracker.app.exception.NoAuthenticatedUserException;

import lombok.extern.slf4j.Slf4j;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigInteger;

@Slf4j
@Service
public class CurrentUserServiceImpl implements CurrentUserService {
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
}
