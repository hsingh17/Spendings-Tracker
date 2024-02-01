package com.spendingstracker.app.filter;

import com.google.gson.Gson;
import com.spendingstracker.app.constants.Constants;
import com.spendingstracker.app.response.ApiResponse;
import com.spendingstracker.app.util.JwtUtil;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;

    private final UserDetailsService userDetailsService;

    public JwtFilter(JwtUtil jwtUtil, UserDetailsService userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

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
                        .filter(cookie -> Constants.TOKEN_KEY.equals(cookie.getName()))
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
        if (userName == null || !jwtUtil.validateToken(token, userDetails)) { // Invalid token
            doFilterWrapper(request, response, filterChain);
            return;
        }

        // Set the authenticated user for the remainder of the filters
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                new UsernamePasswordAuthenticationToken(
                        userDetails, token, userDetails.getAuthorities());
        usernamePasswordAuthenticationToken.setDetails(
                new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext()
                .setAuthentication(
                        usernamePasswordAuthenticationToken); // Set the context to use the
                                                              // UsernamePasswordAuthenticationToken
        doFilterWrapper(request, response, filterChain);
    }

    private void doFilterWrapper(
            HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws IOException {
        try {
            filterChain.doFilter(request, response);
        } catch (Exception e) {
            ApiResponse internalErrResponse =
                    new ApiResponse.ApiResponseBuilder()
                            .setHttpStatus(HttpStatus.INTERNAL_SERVER_ERROR.value())
                            .setOk(false)
                            .setMessage(e.getMessage())
                            .build();

            response.setStatus(internalErrResponse.getHttpStatus());
            response.getOutputStream().println(new Gson().toJson(internalErrResponse));
        }
    }
}
