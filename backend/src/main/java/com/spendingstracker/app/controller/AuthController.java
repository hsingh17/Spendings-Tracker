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

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<String> postLogin(@RequestBody LoginRequestBody loginRequestBody) {
        try {
            // Attempt authentication with the sent login and password
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequestBody.getUsername(), loginRequestBody.getPassword())
            );

            // User has valid credentials in at this point, need to create and return a JWT for the user
            String token = jwtUtil.generateToken((CustomUserDetails) auth.getPrincipal());
            return ResponseEntity.ok(token);
        } catch (Exception e) {
            // Bad login credentials
            return new ResponseEntity<>("Invalid username or password!", HttpStatus.UNAUTHORIZED);
        }
    }
}
