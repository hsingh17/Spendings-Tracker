package com.spendingstracker.app.exception;

/** Exception for when a user's totp code or recovery code could not be verified */
public class MfaNotValidatedException extends AppBadRequestException {
    public MfaNotValidatedException(String message) {
        super(message);
    }
}
