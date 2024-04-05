package com.spendingstracker.app.service.user;

import com.spendingstracker.app.dto.CustomUserDetails;
import com.spendingstracker.app.entity.User;
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

/**
 * Custom implementation of the <code>UserDetailsService</code> and <code>UserService</code>
 * interfaces.
 *
 * @see UserDetailsService
 * @see UserService
 */
@Service
@Slf4j
@Transactional
public class UserServiceImpl implements UserDetailsService, UserService {
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
    @Transactional(readOnly = true)
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
        // TODO: Encrypt password before saving stupid
        String encryptedPassword = bCryptPasswordEncoder.encode(password);
        User user = new User(username, email, encryptedPassword);
        return userRepository.save(user);
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
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            String errMsg = "No user found with USERNAME " + username;
            log.error(errMsg);
            throw new UsernameNotFoundException(errMsg);
        }

        // A CustomUserDetails object since userId must be saved
        return new CustomUserDetails(
                username, user.getPassword(), Collections.emptyList(), user.getUserId());
    }
}
