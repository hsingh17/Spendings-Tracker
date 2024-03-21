package com.spendingstracker.app.service.user;

import com.spendingstracker.app.dto.CustomUserDetails;
import com.spendingstracker.app.entity.User;
import com.spendingstracker.app.repository.UserRepository;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

/**
 * Custom implementation of the <code>UserDetailsService</code> interface.
 *
 * @see UserDetailsService
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;

    /**
     * Initialize <code>UserDetailsServiceImpl</code>
     *
     * @param userRepository <code>UserRepository</code> bean
     * @see UserRepository
     */
    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
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
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found!");
        }

        // A CustomUserDetails object since userId must be saved
        return new CustomUserDetails(
                username, user.getPassword(), Collections.emptyList(), user.getUserId());
    }
}
