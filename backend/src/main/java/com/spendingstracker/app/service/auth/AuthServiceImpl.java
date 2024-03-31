package com.spendingstracker.app.service.auth;

import com.spendingstracker.app.constants.Constants;
import com.spendingstracker.app.dto.CustomUserDetails;
import com.spendingstracker.app.dto.requests.LoginRequest;
import com.spendingstracker.app.dto.requests.RegisterAccountRequest;
import com.spendingstracker.app.exception.NoAuthenticatedUserException;
import com.spendingstracker.app.service.email.EmailService;
import com.spendingstracker.app.service.user.UserService;
import com.spendingstracker.app.util.JwtUtil;

import jakarta.servlet.http.HttpServletResponse;

import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;

/**
 * Implementation of the <code>AuthService</code> interface
 *
 * @see AuthService
 */
@Service
@Transactional
@Slf4j
public class AuthServiceImpl implements AuthService {
    private static final long MAX_AGE_SECONDS_DEFAULT = 3600L;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authManager;
    private final UserService userService;
    private final EmailService emailService;

    public AuthServiceImpl(
            JwtUtil jwtUtil,
            AuthenticationManager authManager,
            UserService userService,
            EmailService emailService) {
        this.jwtUtil = jwtUtil;
        this.authManager = authManager;
        this.userService = userService;
        this.emailService = emailService;
    }

    @Override
    public CustomUserDetails getUserDetailsForAuthenticatedUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            String errMsg = "No authenticated user in the context!";
            log.error(errMsg);
            throw new NoAuthenticatedUserException(errMsg);
        }

        return (CustomUserDetails) auth.getPrincipal();
    }

    @Override
    @Transactional(readOnly = true)
    public UserDetails loginUser(LoginRequest loginRequest, HttpServletResponse response) {
        // Attempt authentication with the sent login and password
        Authentication auth =
                authManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                loginRequest.username(), loginRequest.password()));

        // User has valid credentials in at this point, need to create and return a JWT for the user
        CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
        String token = jwtUtil.generateToken(userDetails);

        setCookie(response, token, MAX_AGE_SECONDS_DEFAULT);
        return userDetails;
    }

    @Override
    public void logoutUser(HttpServletResponse response) {
        setCookie(response, null, 0);
    }

    @Override
    public void registerUser(RegisterAccountRequest registerAcctReq) {
        String username = registerAcctReq.username();
        BigInteger userId =
                userService.createUser(
                        username,
                        registerAcctReq.email(),
                        registerAcctReq.password());
        
        emailService.sendEmail(username);
    }

    private void setCookie(HttpServletResponse response, String token, long maxAge) {
        // Add JWT token in an HTTP only cookie
        ResponseCookie cookie = buildResponseCookie(token, maxAge);
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
