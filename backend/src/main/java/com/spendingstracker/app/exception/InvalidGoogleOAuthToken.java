package com.spendingstracker.app.exception;

/** Exception for when a user has an invalid Google JWT */
public class InvalidGoogleOAuthToken extends AppBadRequestException {
    public InvalidGoogleOAuthToken(String message) {
        super(message);
    }
}
