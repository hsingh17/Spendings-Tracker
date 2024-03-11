package com.spendingstracker.app.controller;

import com.spendingstracker.app.constants.Constants;
import com.spendingstracker.app.dto.CustomUserDetails;
import com.spendingstracker.app.dto.request.LoginRequest;
import com.spendingstracker.app.response.ApiResponse;
import com.spendingstracker.app.util.JwtUtil;

import jakarta.servlet.http.HttpServletResponse;

import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** Controller class that contains routes related to user authentication and authorization */
@RestController
@RequestMapping("/v1/auth")
@Slf4j
public class AuthController {
    private static final long MAX_AGE_SECONDS_DEFAULT = 3600L;
    private final AuthenticationManager authenticationManager;

    private final JwtUtil jwtUtil;

    /**
     * Initialize the <code>AuthController</code> with dependency injection
     *
     * @param authenticationManager <code>AuthenticationManager</code> object
     * @param jwtUtil <code>JwtUtil</code> object
     * @see com.spendingstracker.app.config.SecurityConfig
     * @see JwtUtil
     */
    public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
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
     * @see CustomUserDetails
     */
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<CustomUserDetails>> postLogin(
            @RequestBody LoginRequest loginRequest, HttpServletResponse response)
            throws AuthenticationException {
        log.info("POST /login");

        // Attempt authentication with the sent login and password
        Authentication auth =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                loginRequest.username(), loginRequest.password()));

        // User has valid credentials in at this point, need to create and return a JWT for the user
        CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
        String token = jwtUtil.generateToken(userDetails);

        // Add jwt token in an HTTP only cookie
        ResponseCookie cookie = buildResponseCookie(token, MAX_AGE_SECONDS_DEFAULT);
        response.setHeader(HttpHeaders.SET_COOKIE, cookie.toString()); // Set "token" to be null

        ApiResponse<CustomUserDetails> apiResponse = buildOkAuthApiResponse(userDetails, null);
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

        ResponseCookie cookie = buildResponseCookie(null, 0);
        response.setHeader(HttpHeaders.SET_COOKIE, cookie.toString()); // Set "token" to be null

        ApiResponse<Object> apiResponse = buildOkAuthApiResponse(null, "Successfully logged out");
        return ResponseEntity.ok(apiResponse);
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
