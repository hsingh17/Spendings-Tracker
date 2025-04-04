package com.spendingstracker.app.exception;

/** Exception for when a user tries to change their password but is unable to */
public class InvalidPasswordChangeRequest extends AppBadRequestException {
    public InvalidPasswordChangeRequest(String message) {
        super(message);
    }
}
