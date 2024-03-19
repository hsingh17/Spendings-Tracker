package com.spendingstracker.app.exception;

public class SpendingNotFoundException extends RuntimeException {
    public SpendingNotFoundException(String message) {
        super(message);
    }
}
