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
    public ResponseEntity<ApiResponse> handleNotFoundException(UsernameNotFoundException e) {
        ApiResponse apiResponse =
                new ApiResponse.ApiResponseBuilder<>()
                        .setMessage(e.getMessage())
                        .setOk(false)
                        .setHttpStatus(HttpStatus.NOT_FOUND.value())
                        .build();

        return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({IllegalArgumentException.class, ConversionFailedException.class})
    public ResponseEntity<ApiResponse> handleBadRequestException(IllegalArgumentException e) {
        ApiResponse apiResponse =
                new ApiResponse.ApiResponseBuilder<>()
                        .setMessage(e.getMessage())
                        .setOk(false)
                        .setHttpStatus(HttpStatus.BAD_REQUEST.value())
                        .build();

        return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse> handleDefaultException(Exception e) {
        ApiResponse apiResponse =
                new ApiResponse.ApiResponseBuilder<>()
                        .setMessage(e.getMessage())
                        .setOk(false)
                        .setHttpStatus(HttpStatus.INTERNAL_SERVER_ERROR.value())
                        .build();

        return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
