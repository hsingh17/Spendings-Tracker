package com.spendingstracker.app.controller;

import com.spendingstracker.app.model.CustomUserDetails;
import com.spendingstracker.app.model.LoginRequestBody;
import com.spendingstracker.app.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<CustomUserDetails> postLogin(@RequestBody LoginRequestBody loginRequestBody, HttpServletResponse response) {
        try {
            // Attempt authentication with the sent login and password
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequestBody.getUsername(), loginRequestBody.getPassword())
            );

            // User has valid credentials in at this point, need to create and return a JWT for the user
            CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
            String token = jwtUtil.generateToken(userDetails);

            // Add jwt token in an HTTP only cookie
            Cookie cookie = new Cookie("token", token);
            cookie.setHttpOnly(true);
            cookie.setPath("/api/");
            response.addCookie(cookie);

            return ResponseEntity.ok(userDetails);
        } catch (Exception e) {
            // Bad login credentials
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
    }
}
