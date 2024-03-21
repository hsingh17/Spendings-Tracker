package com.spendingstracker.app.service.auth;

import com.spendingstracker.app.dto.CustomUserDetails;
import com.spendingstracker.app.dto.requests.LoginRequest;

import jakarta.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Service;

/**
 * Service class for implementing logic related to authentication and authorization
 *
 * @see AuthServiceImpl
 */
@Service
public interface AuthService {
    /**
     * Attempts to log the user in with the credenitals passed in.
     *
     * @param loginRequest <code>LoginRequest</code> object containing username and password for
     *     user attempting to login
     * @param response <code>HttpServletResponse</code> object for setting cookie
     * @return <code>CustomUserDetails</code> object that contains detailed user information
     * @see CustomUserDetails
     * @see LoginRequest
     */
    CustomUserDetails loginUser(LoginRequest loginRequest, HttpServletResponse response);

    /**
     * Logs a user out.
     *
     * @param response <code>HttpServletResponse</code> object for setting cookie
     */
    void logoutUser(HttpServletResponse response);
}
