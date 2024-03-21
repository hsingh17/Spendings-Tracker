package com.spendingstracker.app.service.auth;

import com.spendingstracker.app.constants.Constants;
import com.spendingstracker.app.dto.CustomUserDetails;
import com.spendingstracker.app.dto.requests.LoginRequest;
import com.spendingstracker.app.util.JwtUtil;

import jakarta.servlet.http.HttpServletResponse;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Implementation of the <code>AuthService</code> interface
 *
 * @see AuthService
 */
@Service
@Transactional
public class AuthServiceImpl implements AuthService {
    private static final long MAX_AGE_SECONDS_DEFAULT = 3600L;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authManager;

    public AuthServiceImpl(JwtUtil jwtUtil, AuthenticationManager authManager) {
        this.jwtUtil = jwtUtil;
        this.authManager = authManager;
    }

    @Override
    @Transactional(readOnly = true)
    public CustomUserDetails loginUser(LoginRequest loginRequest, HttpServletResponse response) {
        // Attempt authentication with the sent login and password
        Authentication auth =
                authManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                loginRequest.username(), loginRequest.password()));

        // User has valid credentials in at this point, need to create and return a JWT for the user
        CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
        String token = jwtUtil.generateToken(userDetails);

        // Add jwt token in an HTTP only cookie
        ResponseCookie cookie = buildResponseCookie(token, MAX_AGE_SECONDS_DEFAULT);
        response.setHeader(HttpHeaders.SET_COOKIE, cookie.toString()); // Set "token" to be null

        return userDetails;
    }

    @Override
    public void logoutUser(HttpServletResponse response) {
        ResponseCookie cookie = buildResponseCookie(null, 0);
        response.setHeader(HttpHeaders.SET_COOKIE, cookie.toString()); // Set "token" to be null
    }

    /**
     * Build a <code>ResponseCookie</code> from <code>token</code> and <code>maxAge</code>
     *
     * @param token JWT token of the user
     * @param maxAge how long the cookie should remain valid before expiring in seconds
     * @return <code>ResponseCookie</code> object
     * @see ResponseCookie
     */
    private ResponseCookie buildResponseCookie(String token, long maxAge) {
        return ResponseCookie.from(Constants.TOKEN_KEY, token)
                .httpOnly(true)
                .maxAge(maxAge)
                .path("/v1/")
                .secure(true) // If SameSite is "None", then secure must be true (it's fine
                // if localhost uses http though as it is an exception)
                .sameSite("None") // None because eventually backend and frontend will be on
                // different domains so we need to allow for cross-site
                // cookies
                .build();
    }
}
