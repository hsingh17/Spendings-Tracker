package com.spendingstracker.app.controller.auth;

import com.spendingstracker.app.dto.CustomUserDetails;
import com.spendingstracker.app.dto.requests.LoginRequest;
import com.spendingstracker.app.dto.requests.RegisterAcctRequest;
import com.spendingstracker.app.dto.requests.ResetPasswordRequest;
import com.spendingstracker.app.dto.requests.VerifyAcctRequest;
import com.spendingstracker.app.dto.response.*;
import com.spendingstracker.app.response.ApiResponse;
import com.spendingstracker.app.service.auth.AuthService;
import com.spendingstracker.app.util.JwtUtil;

import jakarta.servlet.http.HttpServletResponse;

import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

/** Controller class that contains routes related to user authentication and authorization */
@RestController
@RequestMapping("/v1/auth")
@Slf4j
public class AuthController {
    private final AuthService authService;

    /**
     * Initialize the <code>AuthController</code> with dependency injection
     *
     * @see com.spendingstracker.app.config.SecurityConfig
     * @see JwtUtil
     */
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * Route for returning the <b>authenticated</b> user's details.
     *
     * @return <code>{@literal ResponseEntity<ApiResponse<UserDetails>>}</code> the user's details
     * @see UserDetails
     */
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserDetails>> getMe() {
        log.info("GET /me");

        UserDetails userDetails = authService.getUserDetailsForAuthenticatedUser();
        ApiResponse<UserDetails> apiResponse = buildOkAuthApiResponse(userDetails, null);
        return ResponseEntity.ok(apiResponse);
    }

    /**
     * Route for when a user attempts to log into the application
     *
     * @param loginRequest a <code>LoginRequestBody</code> object that contains the username and
     *     password the user attempted to login with.
     * @param response <code>HttpServletResponse</code> object for returning a cookie to the user
     *     that contains their JWT
     * @return <code>{@literal ResponseEntity<ApiResponse<CustomUserDetails>>}</code> that contains
     *     the user's details post login
     * @throws AuthenticationException if authentication fails
     * @see LoginRequest
     * @see ApiResponse
     * @see UserDetails
     * @see CustomUserDetails
     */
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<UserDetails>> postLogin(
            @RequestBody LoginRequest loginRequest, HttpServletResponse response)
            throws AuthenticationException {
        log.info("POST /login");

        UserDetails userDetails = authService.loginUser(loginRequest, response);
        ApiResponse<UserDetails> apiResponse = buildOkAuthApiResponse(userDetails, null);
        return ResponseEntity.ok(apiResponse);
    }

    /**
     * Route for logging a user out.
     *
     * @param response <code>HttpServletResponse</code> object for unsetting the cookie the user
     *     already has
     * @return <code>{@literal ResponseEntity<ApiResponse<Object>>}</code>
     * @see ApiResponse
     */
    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Object>> postLogout(HttpServletResponse response) {
        log.info("POST /logout");

        authService.logoutUser(response);
        ApiResponse<Object> apiResponse = buildOkAuthApiResponse(null, "Successfully logged out");
        return ResponseEntity.ok(apiResponse);
    }

    /**
     * Controller endpoint for registering a user
     *
     * @param registerAcctReq object containing user data for account registration
     * @return
     * @see ApiResponse
     * @see RegisterAcctRequest
     * @see RegisterAcctResponse
     */
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<RegisterAcctResponse>> register(
            @RequestBody RegisterAcctRequest registerAcctReq) {
        log.info("POST /register");

        RegisterAcctResponse registerAcctResponse = authService.registerUser(registerAcctReq);
        ApiResponse<RegisterAcctResponse> apiResponse =
                buildOkAuthApiResponse(registerAcctResponse, registerAcctResponse.message());

        return ResponseEntity.ok(apiResponse);
    }

    /**
     * Controller endpoint for verifying a user with their input pin
     *
     * @param verifyAcctReq object containing user info for verification process
     * @param username
     * @return
     * @see ApiResponse
     * @see VerifyAcctRequest
     * @see VerifyAcctResponse
     */
    @PutMapping("/verify-acct/{username}")
    public ResponseEntity<ApiResponse<VerifyAcctResponse>> verifyAcct(
            @RequestBody VerifyAcctRequest verifyAcctReq,
            @PathVariable("username") String username,
            HttpServletResponse response) {
        log.info("PUT /verify-acct/{}", username);

        VerifyAcctResponse verifyAcctResponse =
                authService.verifyUser(verifyAcctReq, username, response);
        ApiResponse<VerifyAcctResponse> apiResponse =
                buildOkAuthApiResponse(verifyAcctResponse, verifyAcctResponse.message());

        return ResponseEntity.ok(apiResponse);
    }

    /**
     * Controller endpoint for resending the registration email.
     *
     * @param username user to resend registration email to
     * @return
     * @see ApiResponse
     * @see ResendRegistrationEmailResponse
     */
    @PostMapping("/resend-registration-email/{username}")
    public ResponseEntity<ApiResponse<ResendRegistrationEmailResponse>> resendRegistrationEmail(
            @PathVariable("username") String username) {
        ResendRegistrationEmailResponse response = authService.resendRegistrationEmail(username);
        ApiResponse<ResendRegistrationEmailResponse> apiResponse =
                buildOkAuthApiResponse(response, response.message());

        return ResponseEntity.ok(apiResponse);
    }

    /**
     * Controller endpoint for sending a password reset email to <code>username</code>
     *
     * @param username
     * @return
     * @see ApiResponse
     * @see SendPasswordResetEmailResponse
     */
    @PostMapping("/send-password-reset-email/{username}")
    public ResponseEntity<ApiResponse<SendPasswordResetEmailResponse>> sendPasswordResetEmail(
            @PathVariable("username") String username) {
        SendPasswordResetEmailResponse response = authService.sendPasswordResetEmail(username);
        ApiResponse<SendPasswordResetEmailResponse> apiResponse =
                buildOkAuthApiResponse(response, response.message());

        return ResponseEntity.ok(apiResponse);
    }

    /**
     * Controller endpoint for resetting user's password
     *
     * @param resetPasswordReq
     * @return
     * @see ApiResponse
     * @see ResetPasswordRequest
     * @see ResetPasswordResponse
     */
    @PatchMapping("/reset-password/{username}")
    public ResponseEntity<ApiResponse<ResetPasswordResponse>> resetPassword(
            @PathVariable("username") String username,
            @RequestBody ResetPasswordRequest resetPasswordReq) {
        ResetPasswordResponse response = authService.resetPassword(resetPasswordReq, username);
        ApiResponse<ResetPasswordResponse> apiResponse =
                buildOkAuthApiResponse(response, response.message());

        return ResponseEntity.ok(apiResponse);
    }

    /**
     * Build an <code>OK</code> <code>ApiResponse</code> object from <code>data</code> and <code>
     * message</code>.
     *
     * @param data generic data object
     * @param message message to return to the frontend
     * @return <code>{@literal ApiResponse<T>}</code> object contain
     * @see ApiResponse
     */
    private <T> ApiResponse<T> buildOkAuthApiResponse(T data, String message) {
        return new ApiResponse.ApiResponseBuilder<T>()
                .setData(data)
                .setOk(true)
                .setMessage(message)
                .setHttpStatus(HttpStatus.OK.value())
                .build();
    }
}
