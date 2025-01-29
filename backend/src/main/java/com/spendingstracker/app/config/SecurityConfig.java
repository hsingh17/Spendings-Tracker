package com.spendingstracker.app.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spendingstracker.app.controller.auth.AuthController;
import com.spendingstracker.app.filter.ApiTokenJwtFilter;
import com.spendingstracker.app.filter.MfaTokenJwtFilter;
import com.spendingstracker.app.util.JwtUtil;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

/** Configuration class that configures Spring Security */
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    /** Set shared security configurations for security filter chains */
    private void sharedSecurityConfig(
            HttpSecurity httpSecurity,
            AuthenticationProvider authProvider,
            AuthenticationEntryPoint authEntryPoint)
            throws Exception {
        httpSecurity
                .cors(Customizer.withDefaults())
                .csrf(
                        AbstractHttpConfigurer
                                ::disable) // Disable CSRF since we will use JWT to validate
                // requests
                .sessionManagement(
                        httpSecuritySessionManagementConfigurer ->
                                httpSecuritySessionManagementConfigurer.sessionCreationPolicy(
                                        SessionCreationPolicy.STATELESS))
                .authenticationProvider(authProvider) // Set the DaoAuthenticationProvider
                .exceptionHandling(
                        httpSecurityExceptionHandlingConfigurer ->
                                httpSecurityExceptionHandlingConfigurer.authenticationEntryPoint(
                                        authEntryPoint));
    }

    /** Security chain for routes using "mfa-token" JWT token. */
    @Bean
    @Order(1)
    public SecurityFilterChain securityFilterChainMfaToken(
            HttpSecurity httpSecurity,
            AuthenticationProvider authProvider,
            AuthenticationEntryPoint authEntryPoint,
            ObjectMapper objectMapper,
            JwtUtil jwtUtil,
            UserDetailsService userDetailsService)
            throws Exception {
        sharedSecurityConfig(httpSecurity, authProvider, authEntryPoint);
        return httpSecurity
                .securityMatcher("/v1/mfa/**")
                .authorizeHttpRequests(
                        authorizationManagerRequestMatcherRegistry ->
                                authorizationManagerRequestMatcherRegistry
                                        .anyRequest()
                                        .authenticated())
                .addFilterBefore(
                        new MfaTokenJwtFilter(objectMapper, jwtUtil, userDetailsService),
                        UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    /** Security chain for routes using "api-token" JWT token. */
    @Bean
    @Order(2)
    public SecurityFilterChain securityFilterChainApiToken(
            HttpSecurity httpSecurity,
            AuthenticationProvider authProvider,
            AuthenticationEntryPoint authEntryPoint,
            ObjectMapper objectMapper,
            JwtUtil jwtUtil,
            UserDetailsService userDetailsService)
            throws Exception {
        sharedSecurityConfig(httpSecurity, authProvider, authEntryPoint);
        return httpSecurity
                .securityMatcher("/v1/api/**", "/v1/mfa/**", "/v1/auth/**", "/v1/currency/**")
                .authorizeHttpRequests(
                        authorizationManagerRequestMatcherRegistry ->
                                authorizationManagerRequestMatcherRegistry
                                        .requestMatchers(
                                                "/v1/auth/login",
                                                "/v1/auth/register",
                                                "/v1/auth/verify-acct/**",
                                                "/v1/auth/resend-registration-email/**",
                                                "/v1/auth/reset-password/**",
                                                "/v1/auth/send-password-reset-email/**")
                                        .permitAll()
                                        .anyRequest()
                                        .authenticated())
                .addFilterBefore(
                        new ApiTokenJwtFilter(objectMapper, jwtUtil, userDetailsService),
                        UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    /** Security filter chain for routes that have no authentication required */
    @Bean
    @Order(3)
    public SecurityFilterChain securityFilterChainRemaining(
            HttpSecurity httpSecurity,
            AuthenticationProvider authProvider,
            AuthenticationEntryPoint authEntryPoint)
            throws Exception {
        sharedSecurityConfig(httpSecurity, authProvider, authEntryPoint);
        return httpSecurity
                .securityMatcher("/**")
                .authorizeHttpRequests(
                        authorizationManagerRequestMatcherRegistry ->
                                authorizationManagerRequestMatcherRegistry
                                        .requestMatchers(
                                                // -- Swagger UI v3 (OpenAPI)
                                                "/v3/api-docs/**", "/swagger-ui/**")
                                        .permitAll())
                .build();
    }

    /**
     * @return <code>AuthenticationProvider</code> object that provides authentication via the
     *     custom <code>UserDetailsService</code> and uses a <code>BCryptPasswordEncoder</code>
     * @see UserDetailsService
     * @see BCryptPasswordEncoder
     */
    @Bean
    public AuthenticationProvider authenticationProvider(
            UserDetailsService userDetailsService, BCryptPasswordEncoder bCryptPasswordEncoder) {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(bCryptPasswordEncoder);
        return authProvider;
    }

    /**
     * @return <code>BCryptPasswordEncoder</code> for encrypting passwords
     */
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Create a Spring bean for the <code>AuthenticationManager</code> object. Used in the <code>
     * AuthController</code> to attempt authentication when users logs in.
     *
     * @param authenticationConfiguration
     * @return <code>AuthenticationManager</code> object
     * @throws Exception
     * @see AuthController
     */
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    /**
     * Configure application specific CORS settings.
     *
     * @param allowedOrigins <code>List</code> of <code>String</code> of the allowed origins that
     *     can call this API. Set in the <code>application.yml</code>.
     * @return <code>CorsConfigurationSource</code> object that stores the CORS configuration for
     *     this application
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource(
            @Value("${cors.allowed-origins}") List<String> allowedOrigins) {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedOrigins(allowedOrigins);
        corsConfiguration.setAllowedMethods(
                Arrays.asList(
                        HttpMethod.HEAD.toString(),
                        HttpMethod.GET.toString(),
                        HttpMethod.POST.toString(),
                        HttpMethod.DELETE.toString(),
                        HttpMethod.PATCH.toString(),
                        HttpMethod.PUT.toString()));
        corsConfiguration.setAllowCredentials(true); // Need for cookies
        corsConfiguration.setAllowedHeaders(List.of(HttpHeaders.CONTENT_TYPE));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }
}
