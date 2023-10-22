package com.spendingstracker.app.filter;

import com.google.gson.Gson;
import com.spendingstracker.app.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class CustomAuthEntryPoint implements AuthenticationEntryPoint {
    private final ApiResponse AUTH_ERR_RESPONSE = new ApiResponse.ApiResponseBuilder()
            .setHttpStatus(HttpStatus.UNAUTHORIZED.value())
            .setOk(false)
            .setMessage("Failed to authenticate user")
            .build();

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        response.setStatus(AUTH_ERR_RESPONSE.getHttpStatus());
        response.getOutputStream().println(new Gson().toJson(AUTH_ERR_RESPONSE));
    }
}
