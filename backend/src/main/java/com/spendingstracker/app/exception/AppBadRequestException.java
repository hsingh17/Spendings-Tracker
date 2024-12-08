package com.spendingstracker.app.exception;

/** Abstract class for all custom exceptions that should throw a 400 (Bad Request) to user */
public abstract class AppBadRequestException extends RuntimeException {
    protected AppBadRequestException(String message) {
        super(message);
    }
}
