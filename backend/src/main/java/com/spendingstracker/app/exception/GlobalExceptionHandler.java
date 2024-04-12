package com.spendingstracker.app.exception;

import com.spendingstracker.app.response.ApiResponse;

import org.springframework.core.convert.ConversionFailedException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/** Class that handles exceptions thrown during application runtime. */
@ControllerAdvice
public class GlobalExceptionHandler {
    /**
     * Handles <code>UsernameNotFoundException, AuthenticationException</code>. Returns an HTTP 404.
     *
     * @param e <code>Exception</code> object
     * @see ApiResponse
     */
    @ExceptionHandler({UsernameNotFoundException.class, AuthenticationException.class})
    public ResponseEntity<ApiResponse<Object>> handleNotFoundException(Exception e) {
        return new ResponseEntity<>(
                buildApiResponse(e.getMessage(), HttpStatus.NOT_FOUND), HttpStatus.NOT_FOUND);
    }

    /**
     * Handles exceptions related to bad requests. Returns an HTTP 400.
     *
     * @param e <code>Exception</code> object
     * @see ApiResponse
     * @see NoSuchGraphTypeException
     * @see SpendingNotFoundException
     * @see NoAuthenticatedUserException
     * @see UserNotVerified
     * @see UsernameAlreadyExists
     */
    @ExceptionHandler({
        IllegalArgumentException.class,
        ConversionFailedException.class,
        NoSuchGraphTypeException.class,
        SpendingNotFoundException.class,
        NoAuthenticatedUserException.class,
        UserNotVerified.class,
        UsernameAlreadyExists.class
    })
    public ResponseEntity<ApiResponse<Object>> handleBadRequestException(Exception e) {
        return new ResponseEntity<>(
                buildApiResponse(e.getMessage(), HttpStatus.BAD_REQUEST), HttpStatus.BAD_REQUEST);
    }

    /**
     * Catch all exception handler. Returns an HTTP 500.
     *
     * @param e <code>Exception</code> object
     * @see ApiResponse
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Object>> handleDefaultException(Exception e) {
        return new ResponseEntity<>(
                buildApiResponse(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR),
                HttpStatus.INTERNAL_SERVER_ERROR);
    }

    /**
     * Builds an <code>ApiResponse/code> object from the <code>message</code> and <code>httpStatus</code>.
     * @see ApiResponse
     */
    private ApiResponse<Object> buildApiResponse(String message, HttpStatus httpStatus) {
        return new ApiResponse.ApiResponseBuilder<>()
                .setMessage(message)
                .setOk(false)
                .setHttpStatus(httpStatus.value())
                .build();
    }
}
