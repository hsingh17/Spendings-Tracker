package com.spendingstracker.app.service.email;

import com.spendingstracker.app.entity.User;

import org.springframework.transaction.annotation.Transactional;

/**
 * Service for sending emails to users
 *
 * @see EmailServiceImpl
 */
@Transactional
public interface EmailService {
    /**
     * Send a registration email to <code>user</code>
     *
     * @param user <code>User</code> object for the user to send email to
     * @see User
     */
    void sendRegistrationEmail(User user);

    /**
     * Send a password reset email to <code>user</code>
     *
     * @param user
     * @see User
     */
    void sendPasswordResetEmail(User user);
}
