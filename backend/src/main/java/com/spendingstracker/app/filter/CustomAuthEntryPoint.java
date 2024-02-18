package com.spendingstracker.app.filter;

import com.google.gson.Gson;
import com.spendingstracker.app.response.ApiResponse;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class CustomAuthEntryPoint implements AuthenticationEntryPoint {
    private final Gson gson;
    private final ApiResponse AUTH_ERR_RESPONSE =
            new ApiResponse.ApiResponseBuilder()
                    .setHttpStatus(HttpStatus.UNAUTHORIZED.value())
                    .setOk(false)
                    .setMessage("Failed to authenticate user")
                    .build();

    public CustomAuthEntryPoint(Gson gson) {
        this.gson = gson;
    }

    @Override
    public void commence(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException authException)
            throws IOException, ServletException {
        response.setStatus(AUTH_ERR_RESPONSE.getHttpStatus());
        response.getOutputStream().println(gson.toJson(AUTH_ERR_RESPONSE));
    }
}
