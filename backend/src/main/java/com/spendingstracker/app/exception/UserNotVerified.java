package com.spendingstracker.app.exception;

/** Exception for when a user tries to login but is not yet verified. */
public class UserNotVerified extends RuntimeException {
    public UserNotVerified(String message) {
        super(message);
    }
}
