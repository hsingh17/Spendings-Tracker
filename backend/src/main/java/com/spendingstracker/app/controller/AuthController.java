package com.spendingstracker.app.controller;

import com.spendingstracker.app.constants.Constants;
import com.spendingstracker.app.dto.CustomUserDetails;
import com.spendingstracker.app.dto.LoginRequestBody;
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

@RestController
@RequestMapping("/v1/auth")
@Slf4j
public class AuthController {
    private final AuthenticationManager authenticationManager;

    private final JwtUtil jwtUtil;

    public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> postLogin(
            @RequestBody LoginRequestBody loginRequestBody, HttpServletResponse response)
            throws AuthenticationException {
        log.info("POST /login");
        // Attempt authentication with the sent login and password
        Authentication auth =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                loginRequestBody.getUsername(), loginRequestBody.getPassword()));

        // User has valid credentials in at this point, need to create and return a JWT for the user
        CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
        String token = jwtUtil.generateToken(userDetails);

        // Add jwt token in an HTTP only cookie
        ResponseCookie cookie =
                ResponseCookie.from(Constants.TOKEN_KEY, token)
                        .httpOnly(true)
                        .path("/v1/")
                        .secure(true) // If SameSite is "None", then secure must be true (it's fine
                        // if localhost uses http though as it is an exception)
                        .sameSite("None") // None because eventually backend and frontend will be on
                        // different domains so we need to allow for cross-site
                        // cookies
                        .build();

        response.setHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        ApiResponse<CustomUserDetails> apiResponse =
                new ApiResponse.ApiResponseBuilder<CustomUserDetails>()
                        .setData(userDetails)
                        .setOk(true)
                        .setHttpStatus(HttpStatus.OK.value())
                        .build();

        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse> postLogout(HttpServletResponse response) {
        log.info("POST /logout");
        ResponseCookie cookie =
                ResponseCookie.from(Constants.TOKEN_KEY, null)
                        .httpOnly(true)
                        .maxAge(0)
                        .path("/v1/")
                        .secure(true) // If SameSite is "None", then secure must be true (it's fine
                        // if localhost uses http though as it is an exception)
                        .sameSite("None") // None because eventually backend and frontend will be on
                        // different domains so we need to allow for cross-site
                        // cookies
                        .build();

        response.setHeader(HttpHeaders.SET_COOKIE, cookie.toString()); // Set "token" to be null

        ApiResponse apiResponse =
                new ApiResponse.ApiResponseBuilder<>()
                        .setOk(true)
                        .setMessage("Successfully logged out")
                        .setHttpStatus(HttpStatus.OK.value())
                        .build();

        return ResponseEntity.ok(apiResponse);
    }
}
