package com.spendingstracker.app.filter;

import static com.spendingstracker.app.constants.Constants.MFA_TOKEN_KEY;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spendingstracker.app.util.JwtUtil;

import org.springframework.security.core.userdetails.UserDetailsService;

/**
 * Filter for MFA API routes.
 *
 * @see JwtFilter
 */
public class MfaTokenJwtFilter extends JwtFilter {
    public MfaTokenJwtFilter(
            ObjectMapper objectMapper, JwtUtil jwtUtil, UserDetailsService userDetailsService) {
        super(objectMapper, jwtUtil, userDetailsService, MFA_TOKEN_KEY);
    }
}
