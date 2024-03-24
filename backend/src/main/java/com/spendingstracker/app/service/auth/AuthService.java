package com.spendingstracker.app.service.auth;

import com.spendingstracker.app.dto.CustomUserDetails;
import com.spendingstracker.app.dto.requests.LoginRequest;

import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

/**
 * Service class for implementing logic related to authentication and authorization
 *
 * @see AuthServiceImpl
 */
@Service
public interface AuthService {
    /**
     * Return <code><code>UserDetails</code></code> object for the currently authenticated user's
     * details.
     *
     * @return <code>UserDetails</code> object containing details about the authenticated user.
     * @see UserDetails
     * @see CustomUserDetails
     */
    UserDetails getUserDetailsForAuthenticatedUser();

    /**
     * Attempts to log the user in with the credentials passed in.
     *
     * @param loginRequest <code>LoginRequest</code> object containing username and password for
     *     user attempting to login
     * @param response <code>HttpServletResponse</code> object for setting cookie
     * @return <code>CustomUserDetails</code> object that contains detailed user information
     * @see UserDetails
     * @see CustomUserDetails
     * @see LoginRequest
     */
    UserDetails loginUser(LoginRequest loginRequest, HttpServletResponse response);

    /**
     * Logs a user out.
     *
     * @param response <code>HttpServletResponse</code> object for setting cookie
     */
    void logoutUser(HttpServletResponse response);
}
