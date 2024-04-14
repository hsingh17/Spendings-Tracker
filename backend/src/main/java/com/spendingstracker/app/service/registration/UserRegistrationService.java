package com.spendingstracker.app.service.registration;

import com.spendingstracker.app.entity.User;
import com.spendingstracker.app.entity.UserRegistration;

import org.springframework.transaction.annotation.Transactional;

/**
 * Interface that defines a service for performing operations on the <code>USER_REGISTRATION</code>
 * table.
 *
 * @see UserRegistrationServiceImpl
 */
@Transactional
public interface UserRegistrationService {

    /**
     * Finds a pin for <code>user</code>, otherwise, if they don't have a pin, generate one.
     *
     * @param user
     * @return a 5 digit pin for user registration
     */
    String findOrGeneratePin(User user);

    /**
     * Attempts to save a <code>UserRegistration</code> object to the database. If user already has
     * a <code><code>UserRegistration</code></code> object, then no-op.
     *
     * @param user the user who is registering
     * @param pin Pin the user was sent
     * @param messageId SES Message ID
     * @see UserRegistration
     */
    void attemptSaveUserRegistration(User user, String pin, String messageId);
}
