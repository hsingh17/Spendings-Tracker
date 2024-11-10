package com.spendingstracker.app.service.auth;

import com.spendingstracker.app.dto.CustomUserDetails;

import org.springframework.security.core.userdetails.UserDetails;

import java.math.BigInteger;

/** Retrieves the currently authenticated service for the request */
public interface CurrentUserService {
    /**
     * @return id for the currently authenticated user
     */
    BigInteger getCurrentUserId();

    /**
     * @return <code>UserDetails</code> object containing details about the authenticated user.
     * @see UserDetails
     * @see CustomUserDetails
     */
    CustomUserDetails getCurrentUserDetails();
}
