package com.spendingstracker.app.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spendingstracker.app.dto.response.ApiResponse;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * Implementation of <code>AuthenticationEntryPoint</code> interface for handling when a user fails
 * to be authenticated.
 *
 * @see AuthenticationEntryPoint
 */
@Component
@Slf4j
public class CustomAuthEntryPoint implements AuthenticationEntryPoint {
    private final ObjectMapper objectMapper;
    private final ApiResponse<Object> authErrorResponse =
            new ApiResponse.ApiResponseBuilder<>()
                    .setHttpStatus(HttpStatus.UNAUTHORIZED.value())
                    .setOk(false)
                    .setMessage("Failed to authenticate user")
                    .build();

    /**
     * @param objectMapper <code>ObjectMapper</code>
     * @see com.spendingstracker.app.config.ObjectMapperConfig
     */
    public CustomAuthEntryPoint(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    /**
     * Overloaded function that writes the <code>authErrorResponse</code> object to the HTTP
     * response
     */
    @Override
    public void commence(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException authException)
            throws IOException {
        log.error("Could not authenticate user!");
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.getWriter().write(objectMapper.writeValueAsString(authErrorResponse));
        response.getWriter().flush();
    }
}
