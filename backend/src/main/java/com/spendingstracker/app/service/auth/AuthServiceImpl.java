package com.spendingstracker.app.service.auth;

import static com.spendingstracker.app.constants.Constants.API_TOKEN_KEY;
import static com.spendingstracker.app.constants.Constants.MFA_TOKEN_KEY;

import com.spendingstracker.app.constants.ExternalUserType;
import com.spendingstracker.app.dto.CustomUserDetails;
import com.spendingstracker.app.dto.oauth.OAuthPayload;
import com.spendingstracker.app.dto.requests.*;
import com.spendingstracker.app.dto.response.*;
import com.spendingstracker.app.entity.User;
import com.spendingstracker.app.service.email.EmailService;
import com.spendingstracker.app.service.oauth.OAuthService;
import com.spendingstracker.app.service.user.ExternalUserService;
import com.spendingstracker.app.service.user.UserService;
import com.spendingstracker.app.util.JwtUtil;

import jakarta.servlet.http.HttpServletResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.math.BigInteger;

/**
 * Implementation of the <code>AuthService</code> interface
 *
 * @see AuthService
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authManager;
    private final UserService userService;
    private final EmailService emailService;
    private final OAuthService oAuthService;
    private final ExternalUserService externalUserService;
    private final CurrentUserService curUserService;

    @Override
    public UserDetails loginUser(
            LoginRequest loginRequest,
            HttpServletResponse response,
            ExternalUserType externalUserType) {

        String username = loginRequest.username();
        String password = loginRequest.password();

        // Need to verify 3rd party payload and grab username from payload before continuing for 3rd
        // party authentication
        if (externalUserType != null) {
            OAuthPayload payload =
                    attemptOAuthLoginFlow(loginRequest.oAuthCredential(), externalUserType);
            username = payload.username();
            password = "";
        }

        // Attempt authentication with the login and password
        Authentication auth =
                authManager.authenticate(
                        new UsernamePasswordAuthenticationToken(username, password));

        // User has valid credentials in at this point, need to create and return a JWT for the user
        CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
        setAuthenticatedCookie(response, MFA_TOKEN_KEY, userDetails, "/v1/mfa/", 300L);

        return userDetails;
    }

    @Override
    public void logoutUser(HttpServletResponse response) {
        setCookie(MFA_TOKEN_KEY, response, null, 0, null);
        setCookie(API_TOKEN_KEY, response, null, 0, null);
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
        setAuthenticatedCookie(response, MFA_TOKEN_KEY, userDetails, "/v1/mfa/", 300L);

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

    @Override
    public void deleteUser(HttpServletResponse response) {
        BigInteger userId = curUserService.getCurrentUserId();
        userService.deleteUser(userId);
        setCookie(MFA_TOKEN_KEY, response, null, 0, null);
        setCookie(API_TOKEN_KEY, response, null, 0, null);
    }

    @Override
    public ChangePasswordResponse changePassword(
            ChangePasswordRequest changePasswordReq, HttpServletResponse httpResponse) {
        CustomUserDetails curUserDetails = curUserService.getCurrentUserDetails();
        BigInteger userId = curUserDetails.getUserId();
        userService.changePassword(changePasswordReq, userId);

        String message = "Successfully changed password for " + curUserDetails.getUsername();
        log.info(message);
        setCookie(MFA_TOKEN_KEY, httpResponse, null, 0, null);
        return new ChangePasswordResponse(message);
    }

    private OAuthPayload attemptOAuthLoginFlow(
            String oAuthLoginCredential, ExternalUserType externalUserType) {
        OAuthPayload oAuthPayload =
                oAuthService.extractPayload(oAuthLoginCredential, externalUserType);

        if (!externalUserService.exists(oAuthPayload, externalUserType)) {
            externalUserService.createUser(oAuthPayload, externalUserType);
        }
        return oAuthPayload;
    }

    public void setAuthenticatedCookie(
            HttpServletResponse response,
            String name,
            CustomUserDetails userDetails,
            String path,
            long maxAge) {
        String token = jwtUtil.generateToken(userDetails);
        setCookie(name, response, token, maxAge, path);
    }

    /** Helper function for setting cookie in response */
    private void setCookie(
            String name, HttpServletResponse response, String token, long maxAge, String path) {
        // Add JWT token in an HTTP only cookie
        ResponseCookie cookie = buildResponseCookie(name, token, maxAge, path);
        response.setHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

    /**
     * Build a <code>ResponseCookie</code> from <code>token</code> and <code>maxAge</code>
     *
     * @param name cookie name
     * @param token JWT token of the user
     * @param maxAge how long the cookie should remain valid before expiring in seconds
     * @param path path that this token is valid for
     * @return <code>ResponseCookie</code> object
     * @see ResponseCookie
     */
    private ResponseCookie buildResponseCookie(
            String name, String token, long maxAge, String path) {
        return ResponseCookie.from(name, token)
                .httpOnly(true)
                .maxAge(maxAge)
                .path(path)
                .secure(true) // If SameSite is "None", then secure must be true (it's fine
                // if localhost uses http though as it is an exception)
                .sameSite("None") // None because eventually backend and frontend will be on
                // different domains so we need to allow for cross-site
                // cookies
                .build();
    }
}
