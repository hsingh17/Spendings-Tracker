package com.spendingstracker.app.service.user;

import com.spendingstracker.app.dto.CustomUserDetails;
import com.spendingstracker.app.dto.requests.ChangePasswordRequest;
import com.spendingstracker.app.dto.requests.ResetPasswordRequest;
import com.spendingstracker.app.dto.requests.VerifyAcctRequest;
import com.spendingstracker.app.entity.*;
import com.spendingstracker.app.entity.Currency;
import com.spendingstracker.app.exception.*;
import com.spendingstracker.app.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;
import java.util.*;

/**
 * Custom implementation of the <code>UserDetailsService</code> and <code>UserService</code>
 * interfaces.
 *
 * @see UserDetailsService
 * @see UserService
 */
@Service
@Slf4j
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    /**
     * Initialize <code>UserDetailsServiceImpl</code>
     *
     * @param userRepository <code>UserRepository</code> bean
     * @param bCryptPasswordEncoder
     * @see UserRepository
     */
    public UserServiceImpl(
            UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    public User getUserById(BigInteger userId) {
        return userRepository
                .findById(userId)
                .orElseThrow(
                        () -> {
                            String errMsg = "User not found for USER_ID " + userId;
                            log.error(errMsg);
                            return new UsernameNotFoundException(errMsg);
                        });
    }

    @Override
    public User createUser(String username, String email, String password) {
        // Check if user already exists
        Optional<User> userOpt = maybeFindUserByUsername(username);

        if (userOpt.isPresent()) {
            String errMsg = "Username " + username + " is already taken.";
            log.error(errMsg);
            throw new UsernameAlreadyExists(errMsg);
        }

        log.info("Creating user for {} with USERNAME {}", email, username);
        String encryptedPassword = bCryptPasswordEncoder.encode(password);
        User user = new User(username, email, encryptedPassword);
        return userRepository.save(user);
    }

    @Override
    public void verifyUser(VerifyAcctRequest verifyAcctReq, String username) {
        User user = findUserByUsernameOrThrow(username);
        UserRegistration userRegistration = user.getUserRegistration();
        String actualPin = verifyAcctReq.pin();
        String expectedPin = userRegistration.getPin();

        if (!actualPin.equals(expectedPin)) {
            String errMsg = actualPin + " is not the correct pin for user " + username;
            log.error(errMsg);
            throw new IncorrectPinException(errMsg);
        }

        // Pins match. User is verified and active now.
        user.setActiveAndVerified();
        userRepository.save(user);
    }

    @Override
    @Transactional(readOnly = true)
    public User findUserByUsername(String username) {
        return findUserByUsernameOrThrow(username);
    }

    @Override
    public void resetPassword(ResetPasswordRequest resetPasswordReq, String username) {
        UUID actualUUID = resetPasswordReq.uuid();
        User user = findUserByUsernameOrThrow(username);
        UserPasswordReset passwordReset = user.getLatestPasswordReset();

        // Invalid password reset request
        if (passwordReset == null || !passwordReset.getUuid().equals(actualUUID)) {
            String errMsg = "Invalid password reset request for " + username;
            log.error(errMsg);
            throw new InvalidPasswordResetRequest(errMsg);
        }

        // Valid password reset request, so change user's password
        user.setPassword(bCryptPasswordEncoder.encode(resetPasswordReq.password()));
        passwordReset.setUsed(true);
        userRepository.save(user);
    }

    @Override
    public void changePassword(ChangePasswordRequest changePasswordReq, BigInteger userId) {
        User user = getUserById(userId);
        if (!isSamePassword(user.getPassword(), changePasswordReq.oldPassword())) {
            String errMsg = "Invalid password reset request for " + user.getUsername();
            log.error(errMsg);
            throw new InvalidPasswordChangeRequest(errMsg);
        }

        // Succesfully change password
        user.setPassword(bCryptPasswordEncoder.encode(changePasswordReq.newPassword()));
        userRepository.save(user);
    }

    @Override
    public void deleteUser(BigInteger userId) {
        User user = getUserById(userId);
        user.setActive(false);
        userRepository.save(user);
    }

    @Override
    public void updateCurrency(Currency currency, BigInteger userId) {
        User user = getUserById(userId);
        Currency curPrefCurrency = user.getPrefCurrency();
        if (curPrefCurrency.equals(currency)) {
            // NOOP: Same currency
            return;
        }

        user.setPrefCurrency(currency);
        userRepository.save(user);
    }

    @Override
    public void addMfa(String username, String secretString, List<String> recoveryCodes) {
        User user = findUserByUsernameOrThrow(username);
        UserMfaString mfaString =
                new UserMfaString(user, bCryptPasswordEncoder.encode(secretString));
        List<UserRecoveryCode> userRecoveryCodes = new ArrayList<>();

        for (String recoveryCode : recoveryCodes) {
            userRecoveryCodes.add(
                    new UserRecoveryCode(user, bCryptPasswordEncoder.encode(recoveryCode)));
        }

        user.addMfa(mfaString, userRecoveryCodes);
    }

    /**
     * Finds user's <code>UserDetails</code> object by their <code>username</code>.
     *
     * @param username self-explanatory
     * @return <code>UserDetails</code> object for <code>username</code> containing details for the
     *     user.
     * @throws UsernameNotFoundException when username is not found in <code>APP.USER</code> table.
     * @see UserDetails
     */
    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException, InvalidUser {
        User user = findUserByUsernameOrThrow(username);

        if (!user.isVerified()) {
            String errMsg = "User with USERNAME " + username + " is not verified!";
            log.error(errMsg);
            throw new InvalidUser(errMsg);
        }

        // A CustomUserDetails object since userId must be saved
        return new CustomUserDetails(user, Collections.emptyList());
    }

    private Optional<User> maybeFindUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    private User findUserByUsernameOrThrow(String username) {
        Optional<User> userOpt = maybeFindUserByUsername(username);
        if (userOpt.isEmpty()) {
            String errMsg = "No username found with USERNAME " + username;
            log.error(errMsg);
            throw new UsernameNotFoundException(errMsg);
        }

        return userOpt.get();
    }

    /**
     * @param expectedPassword real password of user. NOTE: this password is straight from the DB,
     *     so it's encrypted
     * @param actualPassword password the user entered. NOTE: this password is plaintext
     * @return if the password entered by user is the same as the password they have stored in the
     *     DB. This is done by comparing the encrypted values of both
     */
    private boolean isSamePassword(String expectedPassword, String actualPassword) {
        return bCryptPasswordEncoder.matches(actualPassword, expectedPassword);
    }
}
