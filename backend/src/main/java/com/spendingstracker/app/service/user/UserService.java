package com.spendingstracker.app.service.user;

import com.spendingstracker.app.dto.requests.ChangePasswordRequest;
import com.spendingstracker.app.dto.requests.ResetPasswordRequest;
import com.spendingstracker.app.dto.requests.VerifyAcctRequest;
import com.spendingstracker.app.entity.Currency;
import com.spendingstracker.app.entity.User;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;
import java.util.List;

/**
 * Interface to define a service that performs operations on the <code>USER</code> table
 *
 * @see UserServiceImpl
 */
@Transactional
public interface UserService extends UserDetailsService {
    /**
     * Return <code>User</code> by looking up via its <code>userId</code>
     *
     * @return the found <code>User</code> object.
     */
    @Transactional(readOnly = true)
    User getUserById(BigInteger userId);

    /**
     * Create and save a <code>User</code> object to store into the database
     *
     * @return <code>BigInteger</code> of user's <code>USER_ID</code> after saving into the
     *     database.
     * @see User
     */
    User createUser(String username, String email, String password);

    /**
     * Attempt to verify the username with pin they entered.
     *
     * @param verifyAcctReq object containing the pin they entered
     * @param username the username's username who is attempting verification
     * @see VerifyAcctRequest
     */
    void verifyUser(VerifyAcctRequest verifyAcctReq, String username);

    /**
     * @throws org.springframework.security.core.userdetails.UsernameNotFoundException if a user
     *     with username <code>username</code> is not found
     * @return <code>User</code> object for <code>username</code>
     */
    User findUserByUsername(String username);

    /**
     * Reset's a user's password if criteria is met
     *
     * @see ResetPasswordRequest
     */
    void resetPassword(ResetPasswordRequest resetPasswordReq, String username);

    /**
     * Change a user's password if criteria is met
     *
     * @see ChangePasswordRequest
     */
    void changePassword(ChangePasswordRequest changePasswordReq, BigInteger userId);

    /** Delete's a user with <code>USER_ID=userId</code> */
    void deleteUser(BigInteger userId);

    /**
     * Change's a user's currency to <code>currency</code>
     *
     * @see Currency
     */
    void updateCurrency(Currency currency, BigInteger userId);

    /** Add MFA to a user */
    void addMfa(User user, String secretString, List<String> recoveryCodes);
}
