package com.spendingstracker.app.exception;

/** Exception for when user attempts to verify with an incorrect pin */
public class IncorrectPinException extends RuntimeException {
    public IncorrectPinException(String message) {
        super(message);
    }
}
