package com.spendingstracker.app.service.auth;

import com.spendingstracker.app.constants.Constants;
import com.spendingstracker.app.dto.CustomUserDetails;
import com.spendingstracker.app.dto.GoogleOAuthPayload;
import com.spendingstracker.app.dto.requests.LoginRequest;
import com.spendingstracker.app.dto.requests.RegisterAcctRequest;
import com.spendingstracker.app.dto.requests.ResetPasswordRequest;
import com.spendingstracker.app.dto.requests.VerifyAcctRequest;
import com.spendingstracker.app.dto.response.*;
import com.spendingstracker.app.entity.User;
import com.spendingstracker.app.exception.NoAuthenticatedUserException;
import com.spendingstracker.app.proxy.google.GoogleOAuthProxyServiceImpl;
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

/**
 * Implementation of the <code>AuthService</code> interface
 *
 * @see AuthService
 */
@Service
@Slf4j
public class AuthServiceImpl implements AuthService {
    private static final long MAX_AGE_SECONDS_DEFAULT = 3600L;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authManager;
    private final UserService userService;
    private final EmailService emailService;
    private final GoogleOAuthProxyServiceImpl googleOAuthProxyService;

    public AuthServiceImpl(
            JwtUtil jwtUtil,
            AuthenticationManager authManager,
            UserService userService,
            EmailService emailService,
            GoogleOAuthProxyServiceImpl googleOAuthProxyService) {
        this.jwtUtil = jwtUtil;
        this.authManager = authManager;
        this.userService = userService;
        this.emailService = emailService;
        this.googleOAuthProxyService = googleOAuthProxyService;
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
    public UserDetails loginUser(
            LoginRequest loginRequest, HttpServletResponse response, boolean withGoogle) {
        if (withGoogle) {
            attemptGoogleLoginFlow(loginRequest.googleCredential());
        }

        // Attempt authentication with the sent login and password
        Authentication auth =
                authManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                loginRequest.username(), loginRequest.password()));

        // User has valid credentials in at this point, need to create and return a JWT for the user
        CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
        setAuthenticatedCookie(response, userDetails);

        return userDetails;
    }

    @Override
    public void logoutUser(HttpServletResponse response) {
        setCookie(response, null, 0);
    }

    @Override
    public RegisterAcctResponse registerUser(RegisterAcctRequest registerAcctReq) {
        String username = registerAcctReq.username();
        String email = registerAcctReq.email();
        User user = userService.createUser(username, email, registerAcctReq.password());

        emailService.sendRegistrationEmail(user);

        String message = "Successfully sent user " + username + " a registration email to " + email;
        log.info(message);
        return new RegisterAcctResponse(username, email, message);
    }

    @Override
    public VerifyAcctResponse verifyUser(
            VerifyAcctRequest verifyAcctReq, String username, HttpServletResponse response) {
        log.info("Attempting verification for user {}", username);

        userService.verifyUser(verifyAcctReq, username);
        String message = "Successfully verified account for user " + username;

        log.info(message);
        CustomUserDetails userDetails =
                (CustomUserDetails) userService.loadUserByUsername(username);

        log.info("Setting cookie for newly verified user {}", username);
        setAuthenticatedCookie(response, userDetails);

        return new VerifyAcctResponse(username, message);
    }

    @Override
    public ResendRegistrationEmailResponse resendRegistrationEmail(String username) {
        User user = userService.findUserByUsername(username);
        emailService.sendRegistrationEmail(user);

        String message = "Resent registration email to " + username;
        log.info(message);

        return new ResendRegistrationEmailResponse(message);
    }

    @Override
    public SendPasswordResetEmailResponse sendPasswordResetEmail(String username) {
        User user = userService.findUserByUsername(username);
        emailService.sendPasswordResetEmail(user);

        String message = "Sent password reset email to " + username;
        log.info(message);
        return new SendPasswordResetEmailResponse(message);
    }

    @Override
    public ResetPasswordResponse resetPassword(
            ResetPasswordRequest resetPasswordReq, String username) {
        userService.resetPassword(resetPasswordReq, username);

        String message = "Successfully reset password for " + username;
        log.info(message);
        return new ResetPasswordResponse(message);
    }

    private void attemptGoogleLoginFlow(String googleCredential) {
        // 1. Verify if legit JWT. If legit return all relevant fields. If not then throw
        GoogleOAuthPayload googleOAuthPayload =
                googleOAuthProxyService.extractPayload(googleCredential);

        // 3. Check if external user already exists by doing lookup on EMAIL, USERNAME,

        // EXTERNAL_IDENTIF in USER, EXTERNAL_USER
        // 4. If
        // 4a.  Not exists: Create USER and EXTERNAL_USER records. Generate
        // 5: Generate JWT and set as cookie.
        // https://developers.google.com/identity/sign-in/web/backend-auth#using-a-google-api-client-library
    }

    private void setAuthenticatedCookie(
            HttpServletResponse response, CustomUserDetails userDetails) {
        String token = jwtUtil.generateToken(userDetails);
        setCookie(response, token, MAX_AGE_SECONDS_DEFAULT);
    }

    /**
     * Helper function for setting cookie in response
     *
     * @param response
     * @param token
     * @param maxAge
     */
    private void setCookie(HttpServletResponse response, String token, long maxAge) {
        // Add JWT token in an HTTP only cookie
        ResponseCookie cookie = buildResponseCookie(token, maxAge);
        response.setHeader(HttpHeaders.SET_COOKIE, cookie.toString());
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
