package com.spendingstracker.app.exception;

/** Exception for when a user tries to create an account with a username that's already in use. */
public class UsernameAlreadyExists extends RuntimeException {
    public UsernameAlreadyExists(String message) {
        super(message);
    }
}
