package com.spendingstracker.app.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spendingstracker.app.dto.response.ApiResponse;
import com.spendingstracker.app.util.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;

/**
 * Custom Spring Security filter that sets the authentication status of the user
 *
 * @see ApiTokenJwtFilter
 * @see MfaTokenJwtFilter
 */
@AllArgsConstructor
public abstract class JwtFilter extends OncePerRequestFilter {
    private final ObjectMapper objectMapper;
    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;
    private final String tokenKey;

    /**
     * Function attempts to extract the JWT from the request cookie and set the authentication to
     * the security context. If the JWT can not be extracted, then attempt to continue filtering.
     */
    @Override
    protected void doFilterInternal(
            HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        // Get JWT from the HTTP only cookie
        Cookie[] cookies = request.getCookies();
        if (cookies == null) { // No cookies
            doFilterWrapper(request, response, filterChain);
            return;
        }

        String token =
                Arrays.stream(cookies)
                        .filter(cookie -> tokenKey.equals(cookie.getName()))
                        .map(Cookie::getValue)
                        .findFirst()
                        .orElse(null);

        if (token == null) {
            doFilterWrapper(request, response, filterChain);
            return;
        }

        // Validate the token
        String userName = jwtUtil.extractUsername(token);
        UserDetails userDetails = userDetailsService.loadUserByUsername(userName);
        // Invalid token or user no longer active
        if (userName == null
                || !jwtUtil.validateToken(token, userDetails)
                || !userDetails.isEnabled()) {
            doFilterWrapper(request, response, filterChain);
            return;
        }

        // Set the authenticated user for the remainder of the filters
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                new UsernamePasswordAuthenticationToken(
                        userDetails, token, userDetails.getAuthorities());

        usernamePasswordAuthenticationToken.setDetails(
                new WebAuthenticationDetailsSource().buildDetails(request));

        SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
        // Set the context to use the UsernamePasswordAuthenticationToken
        doFilterWrapper(request, response, filterChain);
    }

    /**
     * Wrapper function around <code>doFilter</code> that when an exception occurs, return an HTTP
     * 500 response
     *
     * @see ApiResponse
     */
    private void doFilterWrapper(
            HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws IOException {
        try {
            filterChain.doFilter(request, response);
        } catch (Exception e) {
            ApiResponse<Object> internalErrResponse =
                    new ApiResponse.ApiResponseBuilder<>()
                            .setHttpStatus(HttpStatus.INTERNAL_SERVER_ERROR.value())
                            .setOk(false)
                            .setMessage(e.getMessage())
                            .build();

            response.setStatus(internalErrResponse.getHttpStatus());
            response.getWriter().write(objectMapper.writeValueAsString(internalErrResponse));
        }
    }
}
