package com.spendingstracker.app.service;

import com.spendingstracker.app.model.CustomUserDetails;
import com.spendingstracker.app.model.UserDao;
import com.spendingstracker.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDao user = userRepository.findByName(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found!");
        }

        // A CustomUserDetails object since userId must be saved
        return new CustomUserDetails(username, user.getPassword(), Collections.emptyList(), user.getId());
    }
}
