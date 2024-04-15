package com.spendingstracker.app.service.password;

import com.spendingstracker.app.entity.Email;
import com.spendingstracker.app.entity.User;

import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

/**
 * Interface that defines a service for interacting with <code>APP.USER_PASSWORD_RESET</code>
 *
 * @see UserPasswordResetServiceImpl
 */
@Transactional
public interface UserPasswordResetService {
    /**
     * Save a <code>APP.USER_PASSWORD_RESET</code> record for <code>user</code>
     *
     * @param uuid UUID for user that ensures user can only reset password via the email they
     *     receive
     * @param email <code>Email</code> object containing info about SES email sent to <code>user
     *     </code>
     * @param user user who needs password reset
     */
    void saveUserPasswordResetService(UUID uuid, Email email, User user);
}
