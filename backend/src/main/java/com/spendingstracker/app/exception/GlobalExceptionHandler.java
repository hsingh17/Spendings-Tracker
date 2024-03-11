package com.spendingstracker.app.exception;

import com.spendingstracker.app.response.ApiResponse;

import org.springframework.core.convert.ConversionFailedException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler({UsernameNotFoundException.class, AuthenticationException.class})
    public ResponseEntity<ApiResponse<Object>> handleNotFoundException(
            UsernameNotFoundException e) {
        return new ResponseEntity<>(
                buildApiResponse(e.getMessage(), HttpStatus.NOT_FOUND), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({IllegalArgumentException.class, ConversionFailedException.class})
    public ResponseEntity<ApiResponse<Object>> handleBadRequestException(
            IllegalArgumentException e) {
        return new ResponseEntity<>(
                buildApiResponse(e.getMessage(), HttpStatus.BAD_REQUEST), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Object>> handleDefaultException(Exception e) {
        return new ResponseEntity<>(
                buildApiResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR),
                HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private ApiResponse<Object> buildApiResponse(String message, HttpStatus httpStatus) {
        return new ApiResponse.ApiResponseBuilder<>()
                .setMessage(message)
                .setOk(false)
                .setHttpStatus(httpStatus.value())
                .build();
    }
}
