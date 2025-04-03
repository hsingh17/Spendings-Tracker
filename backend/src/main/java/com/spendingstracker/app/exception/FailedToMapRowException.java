package com.spendingstracker.app.exception;

/** Abstract class for when an exception occurs during row mapping */
public class FailedToMapRowException extends RuntimeException {
    public FailedToMapRowException(String message) {
        super(message);
    }
}
