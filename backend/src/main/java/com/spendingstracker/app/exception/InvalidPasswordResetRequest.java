package com.spendingstracker.app.exception;

/**
 * Exception for when a user tries to reset a password with an invalid request (UUID is invalid).
 */
public class InvalidPasswordResetRequest extends RuntimeException {
    public InvalidPasswordResetRequest(String message) {
        super(message);
    }
}
