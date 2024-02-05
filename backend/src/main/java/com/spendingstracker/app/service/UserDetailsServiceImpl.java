package com.spendingstracker.app.service;

import com.spendingstracker.app.dto.CustomUserDetails;
import com.spendingstracker.app.entity.User;
import com.spendingstracker.app.repository.UserRepository;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

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
