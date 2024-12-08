package com.spendingstracker.app.exception;

/**
 * Exception for when a user tries to fetch info but is not valid for some reason (no longer active
 * or not yet verified)
 */
public class InvalidUser extends AppBadRequestException {
    public InvalidUser(String message) {
        super(message);
    }
}
