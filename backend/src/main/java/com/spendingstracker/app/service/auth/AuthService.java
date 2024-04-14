package com.spendingstracker.app.service.auth;

import com.spendingstracker.app.dto.CustomUserDetails;
import com.spendingstracker.app.dto.requests.LoginRequest;
import com.spendingstracker.app.dto.requests.RegisterAcctRequest;
import com.spendingstracker.app.dto.requests.ResetPasswordRequest;
import com.spendingstracker.app.dto.requests.VerifyAcctRequest;
import com.spendingstracker.app.dto.response.*;

import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service class for implementing logic related to authentication and authorization
 *
 * @see AuthServiceImpl
 */
@Transactional
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
    @Transactional(readOnly = true)
    UserDetails loginUser(LoginRequest loginRequest, HttpServletResponse response);

    /**
     * Logs a user out.
     *
     * @param response <code>HttpServletResponse</code> object for setting cookie
     */
    void logoutUser(HttpServletResponse response);

    /**
     * Registers/creates a user's account
     *
     * @param registerAcctReq <code>RegisterAccountRequest</code> object containing relevant user
     *                        info to create their account
     * @return <code>RegisterAccountResponse/code> object containing info on user account registration
     * @see RegisterAcctRequest
     * @see RegisterAcctResponse
     */
    RegisterAcctResponse registerUser(RegisterAcctRequest registerAcctReq);

    /**
     * Attempt to verify the user with pin they entered. If user becomes verified, set JWT token
     *
     * @param verifyAcctReq object containing the pin they entered
     * @param username the user's username who is attempting verification
     * @param response <code>HttpServletResponse</code> object for setting cookie
     * @return <code>VerifyAcctResponse</code> object containing info about account verification.
     * @see VerifyAcctRequest
     * @see VerifyAcctResponse
     */
    VerifyAcctResponse verifyUser(
            VerifyAcctRequest verifyAcctReq, String username, HttpServletResponse response);

    /**
     * Send registration email to user again.
     *
     * @param username username of user to resend registration email to
     * @see ResendRegistrationEmailResponse
     */
    ResendRegistrationEmailResponse resendRegistrationEmail(String username);

    /**
     * Send a password reset email to <code>username</code>
     *
     * @see SendPasswordResetEmailResponse
     */
    SendPasswordResetEmailResponse sendPasswordResetEmail(String username);

    /**
     * Reset's a user's password
     *
     * @param resetPasswordReq request object containing data needed to reset password.
     * @see ResetPasswordRequest
     * @see ResetPasswordResponse
     */
    ResetPasswordResponse resetPassword(ResetPasswordRequest resetPasswordReq);
}
