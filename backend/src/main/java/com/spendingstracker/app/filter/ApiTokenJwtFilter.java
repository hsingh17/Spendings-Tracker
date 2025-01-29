package com.spendingstracker.app.filter;

import static com.spendingstracker.app.constants.Constants.API_TOKEN_KEY;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spendingstracker.app.util.JwtUtil;

import org.springframework.security.core.userdetails.UserDetailsService;

/** Filter for all API routes */
public class ApiTokenJwtFilter extends JwtFilter {
    public ApiTokenJwtFilter(
            ObjectMapper objectMapper, JwtUtil jwtUtil, UserDetailsService userDetailsService) {
        super(objectMapper, jwtUtil, userDetailsService, API_TOKEN_KEY);
    }
}
