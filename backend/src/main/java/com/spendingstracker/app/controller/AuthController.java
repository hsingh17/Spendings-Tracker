package com.spendingstracker.app.controller;

import com.spendingstracker.app.model.CustomUserDetails;
import com.spendingstracker.app.model.LoginRequestBody;
import com.spendingstracker.app.response.ApiResponse;
import com.spendingstracker.app.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/v1/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> postLogin(@RequestBody LoginRequestBody loginRequestBody, HttpServletResponse response) {
        try {
            // Attempt authentication with the sent login and password
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequestBody.getUsername(), loginRequestBody.getPassword())
            );

            // User has valid credentials in at this point, need to create and return a JWT for the user
            CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
            String token = jwtUtil.generateToken(userDetails);

            // Add jwt token in an HTTP only cookie
            ResponseCookie cookie = ResponseCookie.from("token", token)
                    .httpOnly(true)
                    .path("/v1/api/")
                    .secure(true) // If SameSite is "None", then secure must be true (it's fine if localhost uses http though as it is an exception)
                    .sameSite("None") // None because eventually backend and frontend will be on different domains so we need to allow for cross-site cookies
                    .build();

            response.setHeader(HttpHeaders.SET_COOKIE, cookie.toString());

            ApiResponse<CustomUserDetails> apiResponse = new ApiResponse.ApiResponseBuilder<CustomUserDetails>()
                    .setData(userDetails)
                    .setOk(true)
                    .setHttpStatus(HttpStatus.OK)
                    .build();

            return ResponseEntity.ok(apiResponse);
        } catch (Exception e) {
            // Bad login credentials
            ApiResponse apiResponse = new ApiResponse.ApiResponseBuilder<CustomUserDetails>()
                    .setMessage("Login Failed!")
                    .setOk(false)
                    .setHttpStatus(HttpStatus.UNAUTHORIZED)
                    .build();

            return new ResponseEntity<>(apiResponse, HttpStatus.UNAUTHORIZED);
        }
    }
}
