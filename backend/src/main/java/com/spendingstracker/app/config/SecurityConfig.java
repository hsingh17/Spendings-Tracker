package com.spendingstracker.app.config;

import com.spendingstracker.app.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Autowired
    UserDetailsServiceImpl userDetailsService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf().disable(); // Disable CSRF since we will use JWT to validate requests
//        httpSecurity.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS); // Stateless policy since JWT is stateless
        httpSecurity
                .authorizeRequests().antMatchers("/login").permitAll() // Anyone can go to login route
                .and()
                .authorizeRequests().anyRequest().authenticated(); // All other routes require user to be authenticated
        httpSecurity.formLogin(); // Default form login
        httpSecurity.authenticationProvider(authenticationProvider()); // Set the DaoAuthenticationProvider
        return httpSecurity.build();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    private BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
