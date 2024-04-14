package com.spendingstracker.app.service.user;

import com.spendingstracker.app.dto.CustomUserDetails;
import com.spendingstracker.app.dto.requests.VerifyAcctRequest;
import com.spendingstracker.app.entity.User;
import com.spendingstracker.app.entity.UserRegistration;
import com.spendingstracker.app.exception.IncorrectPinException;
import com.spendingstracker.app.exception.UserNotVerified;
import com.spendingstracker.app.exception.UsernameAlreadyExists;
import com.spendingstracker.app.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;
import java.util.Collections;
import java.util.Optional;

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
            String errMsg = "There is already an account with USERNAME " + username;
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

        // Pins match. User is verified now.
        user.setVerified(true);
        userRepository.save(user);
    }

    @Override
    public User findUserByUsername(String username) {
        return findUserByUsernameOrThrow(username);
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
            throws UsernameNotFoundException, UserNotVerified {
        User user = findUserByUsernameOrThrow(username);

        if (!user.isVerified()) {
            String errMsg = "User with USERNAME " + username + " is not yet verified!";
            log.error(errMsg);
            throw new UserNotVerified(errMsg);
        }

        // A CustomUserDetails object since userId must be saved
        return new CustomUserDetails(
                username, user.getPassword(), Collections.emptyList(), user.getUserId());
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
}
