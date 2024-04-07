package com.spendingstracker.app.service.email;

import com.spendingstracker.app.entity.User;

/**
 * Service for sending emails to users
 *
 * @see EmailServiceImpl
 */
public interface EmailService {
    /**
     * Send a registration email to a <code>User</code>
     *
     * @param user <code>User</code> object for the user to send email to
     * @see User
     */
    void sendRegistrationEmail(User user);
}
