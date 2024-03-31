package com.spendingstracker.app.config;

import com.spendingstracker.app.controller.auth.AuthController;
import com.spendingstracker.app.filter.JwtFilter;
import com.spendingstracker.app.service.user.UserServiceImpl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
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
    private final UserDetailsService userDetailsService;

    private final JwtFilter jwtFilter;

    /**
     * Constructor to set class variables <code>userDetailsService</code> and <code>jwtFilter</code>
     * .
     *
     * @param userDetailsService <code>UserDetailsServiceImpl</code> Spring bean.
     * @param jwtFilter <code>JwtFilter</code> Spring bean.
     * @see UserDetailsService
     * @see JwtFilter
     * @see UserServiceImpl
     */
    public SecurityConfig(UserDetailsService userDetailsService, JwtFilter jwtFilter) {
        this.userDetailsService = userDetailsService;
        this.jwtFilter = jwtFilter;
    }

    /**
     * Build <code>SecurityFilterChain</code> for application specific Spring security needs.
     *
     * @param httpSecurity <code>HttpSecurity</code> bean to configure Spring security requirements.
     * @param authProvider <code>AuthenticationProvider</code> bean which is injected from the
     *     function <code>authenticationProvider()</code>
     * @param authEntryPoint <code>AuthenticationEntryPoint</code> bean that is defined in <code>
     *     CustomAuthEntryPoint</code> for returning a custom error response if user is not
     *     authenticated.
     * @return <code>SecurityFilterChain</code> the filter chain that is built
     * @see com.spendingstracker.app.filter.CustomAuthEntryPoint
     */
    @Bean
    public SecurityFilterChain filterChain(
            HttpSecurity httpSecurity,
            AuthenticationProvider authProvider,
            AuthenticationEntryPoint authEntryPoint)
            throws Exception {

        return httpSecurity
                .cors(Customizer.withDefaults())
                .csrf(
                        AbstractHttpConfigurer
                                ::disable) // Disable CSRF since we will use JWT to validate
                // requests
                .sessionManagement(
                        httpSecuritySessionManagementConfigurer ->
                                httpSecuritySessionManagementConfigurer.sessionCreationPolicy(
                                        SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(
                        authorizationManagerRequestMatcherRegistry ->
                                authorizationManagerRequestMatcherRegistry
                                        .requestMatchers(
                                                "/v1/auth/login",
                                                "/v1/auth/register",
                                                "/v1/auth/link-acct",
                                                // -- Swagger UI v3 (OpenAPI)
                                                "/v3/api-docs/**",
                                                "/swagger-ui/**")
                                        .permitAll()
                                        .anyRequest()
                                        .authenticated())
                .authenticationProvider(authProvider) // Set the DaoAuthenticationProvider
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling(
                        httpSecurityExceptionHandlingConfigurer ->
                                httpSecurityExceptionHandlingConfigurer.authenticationEntryPoint(
                                        authEntryPoint))
                .build();
    }

    /**
     * @return <code>AuthenticationProvider</code> object that provides authentication via the
     *     custom <code>UserDetailsService</code> and uses a <code>BCryptPasswordEncoder</code>
     * @see UserDetailsService
     * @see BCryptPasswordEncoder
     */
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(new BCryptPasswordEncoder());
        return authProvider;
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
                        HttpMethod.PUT.toString()));
        corsConfiguration.setAllowCredentials(true); // Need for cookies
        corsConfiguration.setAllowedHeaders(List.of(HttpHeaders.CONTENT_TYPE));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }
}
